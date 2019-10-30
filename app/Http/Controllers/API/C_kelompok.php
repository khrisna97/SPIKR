<?php

namespace App\Http\Controllers\API;
use App\Http\Requests\CreateKelompok;
use App\Http\Requests\UpdateKelompok;
use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\Pipeline\QueryKecamatan;
use App\Pipeline\QueryNamaKelompok;
use App\Pipeline\QueryTipeKelompok;
use App\Repository\Data\Kelompokdatarepo;
use Closure;
use DB;
use Exception;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Pipeline\Pipeline;


class C_kelompok extends Controller
{
    private $messageerror;
    private $messageupdate;
    private $messagecreate;
    private $messagedelete;
    /**
     * @var ResponseFactory|Response
     */

    public function __construct()
    {
        $this->messageupdate = response(["message"=> 'updated']);
        $this->messageerror = response(['message'=> 'Sorry internal server error'], 500);
        $this->messagecreate = response(['message'=> 'Created']);
        $this->messagedelete = response(['message'=> 'Deleted']);
    }
    private function modelUpdate(Closure $callback) : bool{
        $check = true;
        try {
            DB::beginTransaction();
            $callback();
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            $check =false;
        }
        return $check;
    }
    final public function index (int $id = null) : Response{
        $m = new Kelompokdatarepo();
        if ($id === null){
            $pipe = [QueryNamaKelompok::class, QueryTipeKelompok::class, QueryKecamatan::class];
            $repo = app(Pipeline::class)->
            send($m)->through($pipe)->thenReturn()->pagination();
            return response($repo);
        }
        return response($m->getkelompok($id));
    }
    final public function create (CreateKelompok $request) : Response {
        $kelompokAdded = Kelompok::create($request->all());
        if (! $kelompokAdded){
            return $this->messageerror;
        }
        $request->merge(['user'=>$request->input('ketua'), 'kelompok'=>$kelompokAdded->id]);
        AnggotaKelompok::create($request->all());


        $keanggotaan = new AnggotaKelompok();
        $keanggotaan->kelompok = $kelompokAdded->id;
        $keanggotaan->user = $request->input('ketua');
        $keanggotaan->save();


        return $this->messagecreate;
    }
    final public function update (UpdateKelompok $request,int $id) : Response{
        $m = Kelompok::find($id);
        $data = $request->all();
        $check = $this->modelUpdate(static function () use ($m, $data){
            $m->update($data);
            return $m->save();
        });
        if (!$check){
            return $this->messageerror;
        }
        return $this->messageupdate;
    }
    final public function delete (int $id) : Response{
        $m = Kelompok::find($id);
        $check = $this->modelUpdate(static function () use ($m){
            $m->delete();
        });
        if (!$check){
            return $this->messageerror;
        }
        return $this->messagedelete;
    }

    final public function join(int $kelompokid) :Response {
        if (! Kelompok::find($kelompokid)){
            return response(['errors'=>'kelompok not found'], 401);
        }

        if (AnggotaKelompok::whereUser(auth()->id())->count()){
            return response(['errors'=>'Already joined'], 401);
        }

        $data = ['user'=>auth()->id(),'kelompok'=>$kelompokid];

        $joining = AnggotaKelompok::create($data);

        if (! $joining){
            return response(['server-error']);
        }
        return response(['status'=>'joined']);
    }
}