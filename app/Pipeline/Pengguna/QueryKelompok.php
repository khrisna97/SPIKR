<?php


namespace App\Pipeline\Pengguna;


use App\Pipeline\PipelineTrait;
use App\Repository\Data\UserdataRepo;
use Closure;

class QueryKelompok
{
    use PipelineTrait;
    public function handle(UserdataRepo $model, Closure $next){
        if (request()->has('kelompok')){
            $kelompok = request()->query("kelompok");
            $this->checkKelompok($kelompok);

            $model->getInKelompok($kelompok);
            return $next($model);
        }
        return ($next($model));
    }
}