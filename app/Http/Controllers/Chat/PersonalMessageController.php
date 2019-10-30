<?php

namespace App\Http\Controllers\Chat;

use App\Model\PersonalChat;
use App\Model\Userdata;
use App\Repository\MessenggerRepository;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PersonalMessageController extends Controller
{

    final public function index ($other_user_id){
        $user = User::withTrashed()->find($other_user_id);

        if (! $user){
            return response(['bad-request'=>'User not found'],422);
        }

        if ($user->id === auth()->id()){
            return response(['bad-request'=>'You cant request conversations with yourself'],422);
        }

        return MessenggerRepository::getConversations($user->id);
    }
}