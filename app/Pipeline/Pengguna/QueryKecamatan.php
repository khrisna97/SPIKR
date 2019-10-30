<?php


namespace App\Pipeline\Pengguna;


use App\Pipeline\PipelineTrait;
use App\Repository\Data\UserdataRepo;
use Closure;

class QueryKecamatan
{
    use PipelineTrait;
    public function handle(UserdataRepo $model, Closure $next){
        if (request()->has('kecamatan')){
            $kecamatan = request()->query('kecamatan');
            $this->checkKecamatan($kecamatan);
            $model->getInKecamatan($kecamatan);
            return $next($model);
        }
        return $next($model);
    }
}