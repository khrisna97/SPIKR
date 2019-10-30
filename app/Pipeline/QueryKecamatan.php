<?php


namespace App\Pipeline;
use Closure;

class QueryKecamatan
{
    use PipelineTrait;
    public function handle($model, Closure $next){
        if (request()->has('kecamatan')){
            $kecamatan = request()->only('kecamatan');
            $this->checkKecamatan($kecamatan);
            $model->whereKecamatan($kecamatan);
        }
        return $next($model);
    }
}