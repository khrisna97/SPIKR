<?php

namespace App\Broadcasting;

use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\User;

class KonselorChat
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
     * @return array|bool
     */
    public function join(User $user, $konselor_id, $anggota_id)
    {
        $konselor = User::find($konselor_id);
        if ($konselor->hasRole('konselor')){
            $anggota = User::find($anggota_id);
            if ($anggota->hasAnyRole(['konselor','user']) ){
                $kelompok = AnggotaKelompok::whereUser($anggota_id)->first();
                return [
                    'user_id' => $user->id,
                    'nama' => $user->personaldata->nama,
                    'kelompok'=>Kelompok::find($kelompok->kelompok)
                ];
            }
        }
    }
}