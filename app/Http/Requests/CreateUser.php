<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class CreateUser extends FormRequest
{
    protected $customrule = [
        'alamat'=>"required|string|min:10",
        'email'=>"required|email|unique:users,email",
        'gender'=>"required|boolean",
        'kecamatan'=>"required|numeric|string|exists:kecamatan,id",
        'nama'=>"required|string|regex:/^[a-zA-Z ]+$/",
        'nomor-ktp'=>"required|string|digits:15|unique:userdata,nomor-ktp",
        'role'=>"required|numeric|min:2|max:3",
        'password'=>"required|confirmed|alpha_num|min:6",
        'username'=>"required|alpha_num|min:6|unique:users,username",
    ];
    public function rules()
    {
        return $this->customrule;
    }
    public function messages()
    {
        return [
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
            "nomor-ktp.unique"=>"Nomor KTP telah terdaftar",
        ];
    }
}
