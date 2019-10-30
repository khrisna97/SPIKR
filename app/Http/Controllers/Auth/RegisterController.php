<?php

namespace App\Http\Controllers\Auth;

use App\Model\Userdata;
use App\Pipeline\Registration\Account_pipe;
use App\Pipeline\Registration\AssignRole_pipe;
use App\Pipeline\Registration\Userdata_pipe;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Pipeline\Pipeline;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use \Exception;
use Response;
use RuntimeException;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;
    public function UserRegistration(Request $request){
        $request->merge([
            "role"=>"3"
        ]);
        $this->register($request);
    }
    public function KonselorRegistration(Request $request){
        $request->merge([
            "role"=>"2"
        ]);
        $this->register($request);
    }
    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('guest');
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'alamat'=>"required|string|min:10",
            'email'=>"required|email|unique:users,email",
            'gender'=>"required|boolean",
            'kecamatan'=>"required|numeric|exists:kecamatan,id",
            'nama'=>"required|string|regex:/^[a-zA-Z ]+$/",
            'nomor-ktp'=>"required|string|digits:15|unique:userdata,nomor-ktp",
            'role'=>"required|numeric|min:2|max:3",
            'password'=>"required|confirmed|alpha_num|min:6",
            'username'=>"required|alpha_num|min:6|unique:users,username",
        ],[
                "email"=>"Berikan alamat email yang benar",
                "email.unique"=>"Email sudah di gunakan oleh user lain",
                "username.alpha_num"=>"Username hanya dapat berupa karakter alphabetik dan nomor",
                "username.unique"=>"Username Sudah di gunakan oleh user lain",
                "username.min"=>"Minimal :min karakter",
                "password.min"=>"Minimal :min karakter",
                "password.confirmed"=>"Konfirmasi :min tidak sesuai",
                "required"=>"Wajib di isi",
                "kecamatan.exists"=>"Kecamatan tidak terdaftar",
                "kecamatan.numeric"=>"Format kecamatan tidak benar",
                "gender.required"=>"Gender tidak sesuai",
                "nama.regex"=>"Pastikan nama tidak terdapat angka",
                "role.min"=>"Tipe akun tidak sesuai",
                "role.max"=>"Tipe akun tidak sesuai",
                "password.confirmed"=>"Konfirmasi password tidak sesuai",
                "nomor-ktp.digits"=>"Minimal :digits karakter",
                "nomor-ktp.unique"=>"Nomor KTP telah terdaftar",]
        );
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param Request $request
     * @return Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();
        event(new Registered($user = $this->create($request->all())));
        return $this->registered()
            ?: redirect($this->redirectPath());
    }
    final public function registered()
    {
        return response(['status' => 'registered']);
    }
    protected function create(array $data) : \Illuminate\Contracts\Auth\Authenticatable
    {
        $data['api_token'] = Hash::make($data['username'].$data['password']);
        $data['password'] = Hash::make($data['password']);
        $pipes = [
            Account_pipe::class,
            Userdata_pipe::class,
            AssignRole_pipe::class,
        ];
        try {
            return app(Pipeline::class)
                ->send($data)
                ->through($pipes)
                ->thenReturn();
        }catch (RuntimeException $e){
            return response(['status' =>$e], 400)->send();
        }
    }
}