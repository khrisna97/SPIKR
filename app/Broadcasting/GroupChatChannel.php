<?php

namespace App\Broadcasting;

use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\User;

class GroupChatChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $user, $id)
    {
        if ($kelompok = AnggotaKelompok::whereUser($user->id)->whereKelompok($id)->first()){
            return $kelompok->web_socket();
        }
    }
}