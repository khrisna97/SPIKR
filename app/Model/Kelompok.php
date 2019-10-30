<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Kelompok
 *
 * @property int $id
 * @property int $ketua
 * @property int $tipe 0 umum 1 pendidikan
 * @property string $nama
 * @property int $kecamatan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereKecamatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereKetua($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereTipe($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Kelompok whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Kelompok extends Model
{
    //
    protected $table = 'kelompokpik';
    protected $fillable = ['ketua','tipe','nama','kecamatan'];
    public function Ketua(){return $this->hasOne(Userdata::class, 'id','ketua');}
    public function Anggota(){return $this->hasMany(AnggotaKelompok::class,'kelompok','id');}
    public function Kasus(){
        return $this->hasMany(Kasus::class,'kelompok','id');
    }
    public function Kecamatan(){
        return $this->hasOne(Kecamatan::class,'id','kecamatan');
    }
    public function adminFormat(){
        $formatted = [
            'id' =>$this->id,
            'nama' =>$this->nama,
            'anggota' =>$this->Anggota->count() - 1,
            'ketua' =>$this->ketua_kelompok??$this->Ketua->nama,
            'tipe' =>(int) $this->tipe? 'Pendidikan' : 'Masyarakat',
            'kasus' =>$this->Kasus->count(),
            'kecamatan'=>(Kecamatan::find($this->kecamatan_id)->nama??$this->Kecamatan->nama)
        ];
        return $formatted;
    }
}