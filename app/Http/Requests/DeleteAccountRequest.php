<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteAccountRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username'=>'required|exists:users',
            'password'=>'required'
        ];
    }

    public function messages()
    {
        return [
            'username.exists'=>'Username tidak di temukan',
        ];
    }
}