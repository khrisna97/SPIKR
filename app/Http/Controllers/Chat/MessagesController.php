<?php

namespace App\Http\Controllers\Chat;

use App\Events\NewMessegesReceived;
use App\Http\Requests\SentMessegeRequest;
use App\Model\AnggotaKelompok;
use App\Model\PersonalChat;
use App\Model\Userdata;
use App\Repository\MessenggerRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class MessagesController extends Controller
{
    final public function index()
    {
        $model = new MessenggerRepository();
        return $model->getUserInbox(auth()->user());
    }

    private function forceUserToOnline(){
        $sender = Userdata::find(auth()->id());

        if ($sender->online == 0 ){
            $sender->online = 1;
            $sender->save();
        }
    }

    private function MarkingasRead($sender_id){
        PersonalChat::query()->where('dari',$sender_id)
            ->where('ke', auth()->id())->update(['readed'=>1]);
    }

    final public function create(SentMessegeRequest $request) : Response{

        if ($request->input('ke') === $request->input('dari')){
            return response(['bad-request'=>'you cant sent messages to your self'],422);
        }

        $savedChat = PersonalChat::create($request->all());

        if (! $savedChat){
            return response(['server-error'=>'please call admin@spikr.com']);
        }

        $this->forceUserToOnline();
        $this->MarkingasRead($savedChat->ke);

//        Broadcasting back to sender
        broadcast(new NewMessegesReceived($savedChat, $savedChat->dari));

        if (($receiver = Userdata::find($savedChat->ke)) && $receiver->online) {
//           Broadcasting to receiver if she/he is online
            broadcast(new NewMessegesReceived($savedChat));

        }
        return response(['status'=>'sended']);
    }
}