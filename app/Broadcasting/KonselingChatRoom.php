<?php

namespace App\Broadcasting;

use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\User;

class KonselingChatRoom
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
    public function join(User $user, $konselor_id, $anggota_id)
    {

        $kelompok = Kelompok::whereKetua($konselor_id)->first();
        $anggota = AnggotaKelompok::whereUser($anggota_id)->first();

        if (!$kelompok || !$anggota){
            return  false;
        }
        return AnggotaKelompok::
        whereKelompok($kelompok->id)
            ->whereUser($user->id)
            ->first()->User->toArray();
    }
}