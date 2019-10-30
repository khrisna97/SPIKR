<?php

namespace App\Http\Controllers\API\Statistic;

use App\Model\Kasus;
use App\Model\Kelompok;
use App\Repository\Statistic\KasusStatistic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class C_KasusStats extends Controller
{
    private $repo;
    public function __construct()
    {
        $this->repo = new KasusStatistic(Kasus::query());
    }
    public function index(Request $request){
        if ($user = $request->query('user')){
            $this->repo->WhereEqual('user_id', $user);
        }
        if ($kelompok = $request->query('kelompok')){
            $this->repo->WhereEqual('kelompok_id', $kelompok);
        }
        if ($n = $request->query('last_month')){
            $this->repo->GetLastMonthN( $n);
        }
        if ($inkecamatan = $request->query('inkecamatan') ){
            $limit = $request->query('limit') ? $request->query('limit') : 5;
            $this->repo->GetKasusGroupByKecamatan($limit);
        }
        if ($count = $request->query("count"))
            return $this->repo->getCount();
        if ($count = $request->query("get"))
            return $this->repo->getResult();
    }
}