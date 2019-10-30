<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateKasusRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'tipe'=>'required|min:1|max:4',
            'user'=>'required|numeric|exists:users,id',
            'kelompok'=>'sometimes|numeric|exists:kelompokpik,id',
            'keterangan'=>'required'
        ];
    }
}