<?php


namespace App\Pipeline;

use App\Model\Kecamatan;
use App\Model\Kelompok;

trait PipelineTrait
{
    public function checkKecamatan($kecamatan){
        if (Kecamatan::find($kecamatan) === null){
            response(["bad-query"=>"kecamatan did not exist"])->send();
            die();
        }
    }
    public function checkKelompok($kelompok){
        if (Kelompok::find($kelompok) === null){
            response(["bad-query"=>"kelompok did not exist"])->send();
            die();
        }
    }
    public function PaginatorUser(){

    }
    public function PaginatorKelompok(){

    }
}