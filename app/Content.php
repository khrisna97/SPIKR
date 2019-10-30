<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Content extends Model
{
    //
    protected $fillable = ['judul'];
    protected $table = 'berita';

    public function paginateformat(){
        return [
            'judul'=>$this->judul,
            'waktu'=>$this->created_at,
            'id'=>$this->id
        ];
    }

    public function format(){

        $konten = Storage::disk('konten');
        $konten = $konten->get($this->id.'/delta.json');
        return [
          'judul'=>$this->judul,
          'konten'=>($konten)
        ];
    }
}