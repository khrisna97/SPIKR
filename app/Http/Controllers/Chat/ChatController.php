<?php

namespace App\Http\Controllers\Chat;

use App\Events\GroupMessagesIncoming;
use App\Events\GroupUserJoined;
use App\Model\GroupChat;
use App\Model\PersonalChat;
use App\Model\Userdata;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChatController extends Controller
{
    public function index($konselor_id , $anggota_id){
        $from = Auth::user();
        $to = Userdata::find($anggota_id);
        return PersonalChat::where('dari', $from->id)->where('ke',$to->id)->get();
    }

    public function create(){

    }

    public function test($room_id){

        GroupChat::create(
            [
                'user'=> Auth::id(),
                'kelompok'=>$room_id,
                'pesan'=>\request()->input('message')
            ]
        );

        broadcast(new GroupMessagesIncoming($room_id));
    }
}