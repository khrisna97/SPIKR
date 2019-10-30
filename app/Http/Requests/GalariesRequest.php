<?php

namespace App\Http\Requests;

use App\Rules\GaleryRules;
use Illuminate\Foundation\Http\FormRequest;

class GalariesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'judul'=>'required',
            'images'=>'required|array',
            'captions'=>['required','array',new GaleryRules]
        ];
    }
}