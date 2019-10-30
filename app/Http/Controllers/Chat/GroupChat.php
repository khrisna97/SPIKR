<?php

namespace App\Http\Controllers\Chat;

use App\Events\GroupMessagesIncoming;
use App\Events\GroupUserJoined;
use App\Model\AnggotaKelompok;
use App\Model\OnlineStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\GroupChat as GroupChatModel;
class GroupChat extends Controller
{
    public function message($kelompok){

        $chat = GroupChatModel::create([
            'user'=>auth()->id(),
            'kelompok'=> $kelompok,
            'pesan'=>request()->input('message')
        ]);

        if ($chat){

            broadcast(new GroupMessagesIncoming($kelompok, $chat));

            return response(['status'=>'ok']);
        }
    }
    public function index($id){

        $pagination = GroupChatModel::where('kelompok',$id)
            ->orderBy('created_at','DESC')->paginate(10);
        $pagination->transform(function ($item){
            return $item->Format();
        });

        return $pagination;
    }
    public function join($id){
        broadcast(new GroupUserJoined($id));

        $anggota = AnggotaKelompok::whereKelompok($id)->get()->transform(function ($user){
            return $user->User;
        });
        return $anggota;

        return response(['joined']);
    }
}