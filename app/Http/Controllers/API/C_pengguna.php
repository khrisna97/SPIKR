<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateUser;
use App\Http\Requests\DeleteAccountRequest;
use App\Http\Requests\UpdateUser;
use App\Model\Userdata;
use App\Pipeline\QueryKecamatan;
use App\Pipeline\QueryKelompok;
use App\Pipeline\QueryNamaUser;
use App\Pipeline\QueryTipeAkun;
use App\Repository\Data\UserdataRepo;
use App\User;
use Auth;
use DB;
use Exception;
use Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pipeline\Pipeline;

class C_pengguna extends Controller
{
    private $messageerror;
    private $messageupdate;
    private $messagecreate;
    private $messagedelete;

    public function __construct()
    {
        $this->messageupdate = response(["message"=>"updated"]);
        $this->messageerror = response(['message'=>"Sorry internal server error"], 500);
        $this->messagecreate = response(['message'=>"Created"]);
        $this->messagedelete = response(['message'=>"Deleted"]);
    }
//  Save user & user data into database
    private function save_user ($auth, $data){
        try{
            if (! $auth = User::create($auth)){
                throw new Exception();
            }
            $data["id"] = $auth->id;
            if (! $user = Userdata::create($data)){
                $auth->delete();
                throw new Exception();
            }
        }catch (Exception $error){
            return $this->messageerror;
        }
        return $this->messagecreate;
    }
    /**
     * @param Request $request
     * @return array
     */
    private function getRequest ($request){
        $auth= new User();$data= new Userdata();
        $auth = $request->only($auth->getFillable());
        if (isset($auth['password'])){

            if (request()->input('new_pass') && request()->input('new_pass_confirmation') ){
                if (request()->input('new_pass') !== request()->input('new_pass_confirmation') ){
                    response(['errors'=>['new_pass'=>['Konfirmasi password tidak sesuai']]],422)->send();
                    exit();
                }
                $currentPass = User::find(\request()->route()->parameter('id'));
                if (!$currentPass){
                    response(['errors'=>['user'=>['user tidak di temukan']]],422)->send();
                    exit();
                }
                if (! Hash::check($auth['password'], $currentPass->password)){
                    response(['errors'=>['password'=>['Password lama tidak sesuai']]],422)->send();
                    exit();
                }
            }else{
                response(['errors'=>[
                    'new_pass'=>'Password baru wajib disi'
                ]],422)->send();
                exit();
            }
            $auth['password'] = Hash::make(request()->input('new_pass'));
        }
        $data = $request->only($data->getFillable());
        return ["auth"=>$auth, "data"=>$data];
    }
    private function modelUpdate($callback){
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

    private function users($repo){
        $pipe = [QueryKecamatan::class, QueryKelompok::class, QueryNamaUser::class, QueryTipeAkun::class,];
        return app(Pipeline::class)->
        send($repo)->through($pipe)->thenReturn()
            ->paginate();
    }
    public function index($id = null){
        $repo = new UserdataRepo();

        if (request()->query('kelompok') === 'false') {
            $repo->whereNotHaveKelompok();
        }

        if ($id === null) {
            $repo = $this->users($repo);
        } else{
            $repo = $repo->getUser($id);
        }
        return response($repo, 200);
    }
    public function create(CreateUser $request){
        $requestdata = $this->getRequest($request);
        return $this->save_user($requestdata['auth'], $requestdata['data']);
    }
    public function Update(UpdateUser $request){
        $requestdata = $this->getRequest($request);
        $id = $request->route()->parameter('id');
        $check = true;
        if (count($requestdata['auth'])>0){
            $m = User::find($id);
            $check = $this->modelUpdate(function () use ($m , $requestdata ){
                $m->update($requestdata['auth']);
            });
        }
        if (count($requestdata['data'])>0){
            $m = Userdata::find($id);
            $check = $this->modelUpdate(function () use ($m , $requestdata ){
                $m->update($requestdata['data']);
            });
        }
        if (!$check)
            return $this->messageerror;
        return $this->messageupdate;
    }
    public function delete(DeleteAccountRequest $request){

        $user = User::find(auth()->id());

        if ($password = $request->input('password')){
            $check = Hash::check($password,$user->password);
            if (!$check){
                return response(['errors'=>['password'=>['Konfirmasi password salah ']]], 422);
            }
        }

        try {
            $user->delete();
        } catch (Exception $e) {
            return response(['server-error'=>'kesalahan server']);
        }

        return $this->messagedelete;
    }
}