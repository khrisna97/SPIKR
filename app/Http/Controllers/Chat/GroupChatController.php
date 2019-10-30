<?php

namespace App\Http\Controllers\Chat;

use App\Events\GroupMessagesIncoming;
use App\Http\Requests\GroupMessage;
use App\Http\Requests\GroupMessageRequest;
use App\Model\AnggotaKelompok;
use App\Model\GroupChat as GroupChatModel;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Pagination\Paginator;

class GroupChatController extends Controller
{
    /**
     * @param int $group_id Integer
     * Method for get all user in a group
     * @return ResponseFactory|Response
     */
    public function index(int $group_id) : Response{
        $group_member = AnggotaKelompok::whereKelompok($group_id)->get();
        $group_member = $group_member->transform(function (AnggotaKelompok $member){
            return $member->web_socket($member->user);
        });
        return response(['members'=>$group_member]);
    }

    /**
     * @param int $group_id
     * @return ResponseFactory|Response
     */
    public function chat_index(int $group_id) : Response{
        $query = \App\Model\GroupChat::whereKelompok($group_id)->orderBy('created_at','desc');
        $query = $query->paginate(10);
        $query->transform(function ($item){
            return $item->Format();
        });
        return response($query);
    }

    /** insert chat data to database
     * @param GroupMessageRequest $request
     * @param int $group_id
     * @return ResponseFactory | Response
     */
    public function create(GroupMessageRequest $request ,int $group_id) : Response{

        $chat = GroupChatModel::create([
            'user'=>auth()->id(),
            'kelompok'=> $group_id,
            'pesan'=>$request->input('message')
        ]);

        if (!$chat){
            return response(['server-error'=>'unable to save messages'],500);
        }

        broadcast(new GroupMessagesIncoming( $group_id, $chat ));

        return response(['status'=>'ok']);

    }
}