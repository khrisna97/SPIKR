<?php


namespace App\Pipeline;


use Closure;

class QueryNamaKelompok
{
    public function handle($model, Closure $next){
        if (request()->has('nama')){
            $nama_kelompok = request()->query('nama');
            $model->whereKelompokNama($nama_kelompok);
        }
        return $next($model);
    }
}