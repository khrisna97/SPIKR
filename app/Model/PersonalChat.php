<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class PersonalChat extends Model
{
    protected $fillable = ['dari','ke','readed','pesan','created_at'];
    protected $table = 'PersonalChats';

    public function fromUser (){
        return $this->belongsTo(Userdata::class, 'dari','id');
    }
    public function toUser (){
        return $this->belongsTo(Userdata::class, 'ke','id');
    }
    public function Format(){
        $from = $this->fromUser;
        $to = $this->toUser;
        return [
            'users'=>[
                'sender'=>[
                    'name'=>$from->nama,
                    'id'=>$from->id,
                    'online'=>(boolean) $from->online
                ],
                'receiver'=>[
                    'name'=>$to->nama,
                    'id'=>$to->user,
                    'online'=>(boolean) $to->online
                ],
            ],
            'message'=>$this->pesan,
            'time'=>$this->created_at
        ];
    }

}