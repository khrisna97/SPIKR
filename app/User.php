<?php

namespace App;

use App\Model\AnggotaKelompok;
use App\Model\Kecamatan;
use App\Model\Kelompok;
use App\Model\PersonalChat;
use App\Model\Userdata;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

/**
 * App\User
 *
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $email
 * @property string $username
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property int $role 1 untuk anggota dinas, 2 untuk konselor, 3 user anggota
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $api_token
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereApiToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUsername($value)
 * @property-read \App\Model\Userdata $personaldata
 */
class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role', 'api_token', 'username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token'
    ];
    protected $dates = ['deleted_at'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function personaldata(){return $this->hasOne(Userdata::class,'id','id');}
    public function kelompok(){return $this->hasOne(AnggotaKelompok::class,'user','id');}




    public function adminFormat(){
        $nomorktp = 'nomor-ktp';
        return [
            'id'=>$this->id,
            'alamat'=>$this->personaldata->alamat,
            'kelompok'=>$this->kelompok? Kelompok::find($this->kelompok->kelompok)->nama : '-',
            'kelompok_id'=>$this->kelompok? $this->kelompok->id : '-',
            'nama'=>$this->personaldata->nama,
            'nomor-ktp'=>$this->personaldata->$nomorktp,
            'kecamatan'=>$this->kecamatan,
            'jabatan'=>$this->jabatan === 2 ? 'Konselor' : 'Anggota'
        ];
    }
    public function web_socket(){
        $whereCondition = ['dari'=>$this->id,'ke'=>auth()->id(),'readed'=>0];
        return [
            'name'=>$this->nama,
            'id'=>$this->id,
            'online'=>$this->online,
            'unreaded'=>PersonalChat::where($whereCondition)->count()
        ];
    }
}