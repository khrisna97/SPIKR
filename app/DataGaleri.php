<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DataGaleri extends Model
{
    //
    public $timestamps = false;
    protected $fillable = ['caption','galeri_id'];
    protected $table = 'DataGalleri';

    public function format($path){
        return [
          'caption'=>$this->caption,
          'path'=>$path
        ];
    }

}