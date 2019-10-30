<?php


namespace App\Pipeline\Kelompokdata;


use App\Pipeline\PipelineTrait;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class QueryKecamatan
{
    use PipelineTrait;
    public function handle(Builder $model, Closure $next){
        if (request()->has('kecamatan')){
            $kecamatan = request()->query('kecamatan');
            $this->checkKecamatan($kecamatan);
            $model = $model->where("kecamatan",$kecamatan);
        }
        return $next($model);
    }
}