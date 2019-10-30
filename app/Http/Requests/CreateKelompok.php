<?php

namespace App\Http\Requests;

use App\Rules\isKonselor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateKelompok extends FormRequest
{
    protected $customRule = [
        'ketua' =>['required', 'numeric', 'exists:users,id'],
        'tipe' =>['required', 'boolean'],
        'nama' =>['required',"regex:/^[a-zA-Z0-9\s]+$/"],
        'kecamatan' =>['required', 'numeric', 'exists:kecamatan,id'],
    ];
    public function rules()
    {
        $this->customRule['ketua'][] = new isKonselor();
        return $this->customRule;
    }
    public function messages()
    {
        return [
            'ketua.exists' => 'User tidak di temukan',
            'ketua.numeric' => 'Format user tidak sesuai',
            'required' => 'Wajib di isi',
            'tipe.boolean' => 'Format tidak sesuai',
            'nama.alpha_num' => 'Hanya boleh terdapat alphabetikal dan numerik',
            'kecamatan.exists' => 'Kecamatan tidak di temukan',
            'kecamatan.numeric' => 'Format kecamatan tidak sesuai'
        ];
    }
}
