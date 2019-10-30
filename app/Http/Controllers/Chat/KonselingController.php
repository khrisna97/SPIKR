<?php

namespace App\Http\Controllers\Chat;

use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class KonselingController extends Controller
{
    public function index($konselor_id){
        $kelompok = Kelompok::whereKetua($konselor_id)->first();
        $anggota =AnggotaKelompok::
        where('kelompok',$kelompok->id)->where('user','!=',$kelompok->ketua)
            ->get();

        $anggota = $anggota->transform(function ($item){
            return $item->konseling_websocket();
        });
        return ['members' =>$anggota];
    }
    public function userIndex($konselor_id, $anggota_id){
        $anggota = AnggotaKelompok::whereUser($anggota_id)->first()->WebSocketFormat();
        $konselor = AnggotaKelompok::whereUser($konselor_id)->first()->WebSocketFormat();

        return [$anggota, $konselor];
    }
}
