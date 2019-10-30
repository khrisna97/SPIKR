<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateKasusRequest;
use App\Model\Kasus;
use App\Model\Userdata;
use App\Pipeline\QueryKecamatan;
use App\Pipeline\QueryKelompok;
use App\Pipeline\QueryNamaUser;
use App\Pipeline\QueryTipeKasus;
use App\Repository\Data\KasusData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Pipeline\Pipeline;

class C_kasus extends Controller
{
    private $pipe = [QueryNamaUser::class,QueryTipeKasus::class,QueryKecamatan::class,QueryKelompok::class];
    final public function index() : Response{
        $model = new KasusData();
        $repo =  app(Pipeline::class)->
        send($model)->through($this->pipe)->thenReturn()
            ->paginate();
        return response($repo);
    }

    final public function create(CreateKasusRequest $request) : Response {

        $pasien = Userdata::find($request->input('user'));

        if (! $pasien){
            return response(['bad-request'=>'user not found']);
        }

        $data = array_merge(
            $request->all(),
            [
                'dilaporkan_oleh'=>auth()->id(),
                'kecamatan'=>$pasien->kecamatan,
            ]
        );

        $creatingKasus = Kasus::create($data);

        if (!$creatingKasus){
            return response(['server-error'=>'500']);
        }

        return response(['status'=>'created']);
    }
}