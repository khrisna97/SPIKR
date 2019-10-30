<?php

namespace App\Broadcasting;

use App\Model\AnggotaKelompok;
use App\User;

class KonselingSessionGroup
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
     * @param \App\User $user
     * @param int $konselor_id
     * @return array|bool
     */
    public function join(User $user, int $konselor_id)
    {
        //
        if (! $user->hasRole('konselor')){
            return false;
        }

        $anggota = AnggotaKelompok::whereUser($konselor_id)->first();

        if ( !$anggota){
            return  false;
        }
        return AnggotaKelompok::
        whereUser($konselor_id)
            ->whereUser($user->id)
            ->first()->User->toArray();
    }
}
