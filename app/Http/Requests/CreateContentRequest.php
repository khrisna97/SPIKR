<?php

namespace App\Http\Requests;

use App\Rules\QuillDeltaRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateContentRequest extends FormRequest
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
            'konten'=>['required',new QuillDeltaRule]
        ];
    }
}
