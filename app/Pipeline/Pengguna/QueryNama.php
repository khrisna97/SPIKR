<?php


namespace App\Pipeline\Pengguna;


use App\Pipeline\PipelineTrait;
use App\Repository\Data\UserdataRepo;
use Closure;

class QueryNama
{
    use PipelineTrait;
    public function handle (UserdataRepo $model , Closure $next){
        if (request()->has('nama')){
            $model->getByNama(request()->query('nama'));
        }
        return $next($model);
    }
}