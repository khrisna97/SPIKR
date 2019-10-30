<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Galeri extends Model
{
    protected $fillable = ['judul'];
    protected $table = 'Galleri';

    public function Captions (){
        return $this->hasMany(DataGaleri::class ,'galeri_id','id');
    }

    public function paginateFormat(){

        $captions = $this->Captions()->get();
        $disk = Storage::disk('galeri');


        $direktori = $disk->allFiles($this->id.'/');

        $captions = $captions->map(function ($item, $index) use ($disk, $direktori){

            $path = url($disk->url('galeri/'.$direktori[$index]));
            return $item->format($path);
        });

        return [
            'judul'=> $this->judul,
            'id'=>$this->id,
            'foto'=> $captions,
            'jumlahfoto'=>$captions->count(),
            'waktu'=>$this->created_at
//            'waktu'=>$this->created_at->locale('ID')->isoFormat('dddd, D MM YYYY')
        ];
    }
}