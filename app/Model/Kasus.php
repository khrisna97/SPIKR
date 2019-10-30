<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Kasus extends Model
{
    protected $table = "kasus";
    protected $fillable = ['tipe', 'user', 'kelompok', 'keterangan','kecamatan', 'created_at','dilaporkan_oleh'];

    public function Pasien(){
        return $this->hasOne(Userdata::class,'id','user');
    }
    public function Pelapor(){
        return $this->hasOne(Userdata::class,'id','dilaporkan_oleh');
    }

    public function tipeText(){
        return $this->belongsTo(Tipe_kasus::class,'tipe','id');
    }
    public function Kelompok(){
        return $this->belongsTo(Kelompok::class,'kelompok','id');
    }

    public function Kecamatan(){
        return $this->Kelompok->kecamatan();
    }


    public static function whereTipe($tipe){
        return self::where('tipe',$tipe)->get();
    }

    public static function whereUser($user){
        return self::where('user_id',$user)->get();
    }

    public static function whereKelompok($kelompok){
        return self::where('kelompok_id',$kelompok)->get();
    }



    public function Format(){
        $pasien = $this->Pasien;

        return [
            'peserta didik'=>$pasien->nama,
            'kategori'=>$this->kategori,
            'kecamatan'=>$pasien->Kecamatan->nama,
            'kelompok'=>$this->Kelompok ? $this->Kelompok->nama : '-',
            'konselor'=> $this->Pelapor ? $this->Pelapor->nama : '-',
            'keterangan'=>$this->keterangan,
            'waktu'=>$this->waktu,
        ];
    }
}