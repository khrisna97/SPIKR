<?php


namespace App\Repository;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

trait RepoTrait
{
    protected $model;
    protected $select = [];
    public function getResult(){
        return $this->model->get();
    }
    public function getCount(){
        return $this->model->count();
    }
    public function get(){
        return $this->model->get();
    }
    final public function whereRole($role)  {
        $this->model =  $this->model->where('users.role',$role);
    }
    final public function whereKecamatan($kecamatan_id)  {

        $this->model = $this->model->where('kecamatan.id',$kecamatan_id);
    }
    final public function WhereKelompok($kelompok_id)  {
        $this->model = $this->model
            ->join('anggota_kelompok','userdata.id', '=', 'anggota_kelompok.user')
            ->join('kelompokpik','kelompokpik.id', '=', 'anggota_kelompok.kelompok')
            ->where('kelompokpik.id',$kelompok_id);
    }

    final public function whereKelompokTipe($tipe)  {
        $this->model = $this->model->where('kelompokpik.tipe',$$tipe);
    }
    final public function whereKetuaKelompok($ketua_id) {
        $this->model = $this->model->where('kelompokpik.ketua',$ketua_id);
    }
    final public function whereUserNama($nama){
        $this->model = $this->model->where('userdata.nama', $nama)
            ->orWhere('userdata.nama', 'like', '%' . $nama. '%');
    }
    final public function whereKelompokNama($nama) {
        $this->model = $this->model->where('kelompokpik.nama', $nama)
            ->orWhere('kelompokpik.nama', 'like', '%' . $nama. '%');
    }

    public function Pagination($per_page = 10) : LengthAwarePaginator{
        return $this->model->paginate($per_page);
    }









    public function getModel(){return $this->model;}
    public function WhereEqual($column,$equalTo){
        $this->model = $this->model->where($column, $equalTo);
    }
    public function WhereLessTo($column,$equalTo){
        $this->model = $this->model->where($column, '<=',$equalTo);
    }
    public function WhereMoreTo($column,$equalTo){
        $this->model = $this->model->where($column, '>=',$equalTo);
    }
    public function OrderByNewest($column){
        $this->model = $this->model->orderBy($column,'desc');
    }
    public function GroupByNewest($closure){
        $this->model = $this->model->groupBy($closure);
    }
    public function Limit($n){
        $this->model = $this->model->limit($n);
    }
}