<?php

namespace App\Model;

use Auth;
use Illuminate\Database\Eloquent\Model;

class GroupChat extends Model
{
    protected $table = 'GroupChats';
    protected $fillable =['user','kelompok','pesan'];

    public function User(){
        return $this->belongsTo(Userdata::class,'user','id');
    }

    public function Format(){
        $personaldata = $this->User;
        return [
            'users'=>[
                'sender'=>[
                    'name'=>$personaldata->nama,
                    'id'=>$this->user,
                    'online'=>(boolean) $personaldata->online
                ]
            ],
            'message'=>$this->pesan,
            'time'=>$this->created_at
        ];
    }

    public function AnggotaKelompok (){
        return $this->belongsTo(AnggotaKelompok::class,'user','user');
    }
}