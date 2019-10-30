<?php

namespace App\Http\Controllers\API\Statistic;

use App\Model\Kelompok;
use App\Pipeline\Kelompok\QueryKecamatan;
use App\Pipeline\Kelompok\QueryType;
use App\Repository\Statistic\KelompokStatistic;
use App\Http\Controllers\Controller;
use Illuminate\Pipeline\Pipeline;

class C_KelompokStats extends Controller
{
    use StatisticTrait;
    private $repo;
    public function __construct()
    {
        $this->repo = new KelompokStatistic(Kelompok::query());
    }
    public function index(){
        $pipe = [QueryType::class, QueryKecamatan::class];
        $this->repo = app(Pipeline::class)->
        send($this->repo)->through($pipe)->thenReturn();
        return $this->sent();
    }
}