<?php

namespace App\Http\Controllers\Chat;

use App\Broadcasting\KonselingChatRoom;
use App\Events\GroupMessagesIncoming;
use App\Events\KonselingNewMessages;
use App\Events\KonselorReadMessages;
use App\Events\NewMessegesNotification;
use App\Events\PatientNewMessege;
use App\Events\ReadedMessages;
use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\Model\PersonalChat;
use App\Model\Userdata;
use App\User;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class KonselingChatController extends Controller
{
    public function index ($anggota_id){
        $from = PersonalChat::where('dari', $anggota_id)->Where('ke',Auth::id());
        $to = PersonalChat::where('ke', $anggota_id)->Where('dari',Auth::id());
        $chats = $to->latest()->unionAll($from->latest())->latest()->paginate(10);

        $chats->transform(function ($item){
            return $item->Format();
        });

        return $chats;

    }

    private function MarkAsRead($receiver_id){
        $MarksToRead = PersonalChat::where('dari', $receiver_id)->where('ke',auth()->id());

        if ($MarksToRead->update((['readed'=>1]))){

            if (auth()->user()->hasRole('konselor')){

                $kelompok = AnggotaKelompok::whereUser($receiver_id)->first();

                $ketua = Kelompok::find($kelompok->kelompok)->Ketua->personaldata;

                broadcast(new KonselorReadMessages($kelompok, $ketua->id));
            }
        }
    }

    public function create($receiver_id){
        $chat = PersonalChat::create(
            [
                'dari'=>Auth::id(),
                'ke'=>(int)$receiver_id,
                'pesan'=>request()->input('message')
            ]
        );
        if ($chat){

            $this->MarkAsRead($receiver_id);

            broadcast(new KonselingNewMessages($chat));

            if (Userdata::find($receiver_id)->online){

                if ($konselor = User::find($receiver_id)){
                    if ($konselor->hasRole('konselor')){
                        $patient = AnggotaKelompok::whereUser(auth()->id())->first();
                        broadcast(new PatientNewMessege($patient, $receiver_id));
                    }
                }

            }

            return ['sent'=>'ok'];
        }
    }

}
