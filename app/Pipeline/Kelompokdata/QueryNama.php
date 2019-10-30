<?php


namespace App\Pipeline\Kelompokdata;


use Closure;
use Illuminate\Database\Eloquent\Builder;

class QueryNama
{
    public function handle(Builder $model, Closure $next){
        if (request()->has('nama')){
            $nama = request()->query('nama');
            $model = $model->where('nama', $nama)
                ->orWhere('nama', 'like', '%' . $nama. '%');
        }
        return $next($model);
    }
}