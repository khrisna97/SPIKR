<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Kecamatan
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kecamatan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kecamatan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kecamatan query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $nama
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kecamatan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kecamatan whereNama($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Kelompok[] $Kelompok
 * @property-read int|null $kelompok_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Userdata[] $Users
 * @property-read int|null $users_count
 */
class Kecamatan extends Model
{
    //
    public $timestamps = false;
    protected $table = "kecamatan";
    public static function AllSorted(){
        return self::orderBy('nama');
    }
    public function Kelompok(){return $this->hasMany(Kelompok::class,'kecamatan','id');}
    public function Users(){return $this->hasMany(Userdata::class,'kecamatan','id');}
    public function format(){
        return [
            "nama"=>$this->nama,
            "id"=>$this->id
        ];
    }
}