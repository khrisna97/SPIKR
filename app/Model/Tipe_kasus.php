<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Tipe_kasus
 *
 * @property int $id
 * @property string $nama
 * @property int $kode 1: bullying 2:broken home 3:Kriminalitas 4:Asusila 5:Pelajaran 6:Ekonomi 7:Lainya
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tipe_kasus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tipe_kasus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tipe_kasus query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tipe_kasus whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tipe_kasus whereKode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tipe_kasus whereNama($value)
 * @mixin \Eloquent
 */
class Tipe_kasus extends Model
{
    //
    public $timestamps =false;
    protected $table = "tipe_kasus";
    protected $fillable = ["nama", "kode"];
}
