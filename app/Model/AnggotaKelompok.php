<?php

namespace App\Model;
use Auth;
use Illuminate\Database\Eloquent\Model;
/**
 * App\Model\AnggotaKelompok
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok query()
 * @mixin \Eloquent
 * @property int $id
 * @property int $user
 * @property int $kelompok
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok whereKelompok($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\AnggotaKelompok whereUser($value)
 */
class AnggotaKelompok extends Model
{
    protected $table = 'anggota_kelompok';
    protected $fillable = ['user','kelompok'];
    public function Kelompok(){return $this->hasOne(Kelompok::class,'id','kelompok');}
    public function User(){return $this->hasOne(Userdata::class,'id','user');}
    public function ChatFrom(){
        return $this->hasMany(PersonalChat::class,'dari','user');
    }
    public function ChatTo(){
        return $this->hasMany(PersonalChat::class,'ke','user');
    }


    public function web_socket(){
        $user = $this->User;
        return [
            'name'=>$user->nama,
            'id'=>$user->id,
            'online'=>$user->online
        ];
    }

    /**
     * @param bool | int $receiver
     * @return array
     */
    public function konseling_websocket(bool $receiver = false){
        $chats = $this->ChatFrom;
        $chats = $chats->union($this->ChatTo);
        return array_merge(
            $this->web_socket(),
            [
                'unreaded'=>$chats->where('readed',0)->where('ke',$receiver ? $receiver : Auth::id())->count(),
            ]
        );
    }




    public function WebSocketFormat(){

        $chats = $this->ChatFrom;
        $chats = $chats->union($this->ChatTo);
        $user = $this->User;

        return [
            'user_id'=>$this->user,
            'name'=>$user->nama,
            'unreaded'=>$chats->where('readed',0)->where('ke', Auth::id())->count(),
            'online'=>$user->online
        ];
    }
}