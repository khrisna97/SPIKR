<?php

namespace App\Http\Controllers\API;
use App\Model\Kecamatan;
use App\Model\Kelompok;
use App\Model\Userdata;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class C_kecamatan extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    final public function index(Request $request) : Response
    {
        $paginate = null;
        if ($request->has(['search','id'])){
            $search = $request->query('search');
            $id = $request->query('id');
            if ($search === 'anggota'){
                $paginate = Userdata::orderBy('nama');
            }
            if ($search === 'kelompok'){
                $paginate = Kelompok::orderBy('nama');
            }
            $paginate = $paginate->whereKecamatan($id);
        }else{
            $paginate = Kecamatan::AllSorted();
        }
        $paginate = $paginate->paginate(10);
        return response($paginate, 200);
    }
}
