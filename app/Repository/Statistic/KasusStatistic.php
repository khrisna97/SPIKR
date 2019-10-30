<?php


namespace App\Repository\Statistic;


use App\Repository\RepoTrait;
use Illuminate\Support\Facades\DB;

class KasusStatistic
{
    use RepoTrait;
    public function __construct($model)
    {
        $this->model = $model;
    }
    public function GetLastMonthN($n = 6){
        $this->model = $this->model->select(DB::raw('count(id) as `kasus`'),DB::raw('YEAR(created_at) `tahun`'),DB::raw('MONTH(created_at) bulan'));
        $this->GroupByNewest(DB::raw('YEAR(created_at)'));
        $this->GroupByNewest(DB::raw('MONTH(created_at)'));
        $this->OrderByNewest('tahun');
        $this->OrderByNewest('bulan');
        $this->Limit($n);
    }
    public function GetKasusGroupByKecamatan($limit = 5){
        $this->model = $this->model->
        select(DB::raw('count(kasus.id) as total'),'kecamatan.nama as nama')
//            ->join('kelompokpik','kelompokpik.id','=','kasus.kelompok')
            ->join('kecamatan','kasus.kecamatan','=','kecamatan.id')
        ->groupBy('kecamatan.nama');
        $this->OrderByNewest('total');
        $this->Limit($limit);
    }
}