<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Userdata
 *
 * @property int $id
 * @property string $nama
 * @property string $nomor-ktp
 * @property int $gender 0 wanita 1 pria
 * @property string $alamat
 * @property int $kecamatan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereAlamat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereKecamatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereNomorKtp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Userdata whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Userdata extends Model
{
    //
    protected $table = "userdata";
    protected $hidden = ['no-ktp','created_at','updated_at'];
    protected $fillable = ["nama","nomor-ktp","gender","alamat","kecamatan","id"];

    public function kelompok(){return $this->hasOne(AnggotaKelompok::class,'user','id');}
    public function Kecamatan(){return $this->belongsTo(Kecamatan::class,'kecamatan','id');}
//    public function __construct(array $attributes = [])
//    {
//        if (\Auth::check()&&(\Auth::user()->hasRole('admin'))){
//            $this->hidden = ['created_at','updated_at'];
//        }
//        parent::__construct($attributes);
//    }
}
