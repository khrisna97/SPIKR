<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SentMessegeRequest extends FormRequest
{

//    /**
//     * Determine if the user is authorized to make this request.
//     *
//     * @return bool
//     */
//    public function authorize()
//    {
//        return false;
//    }


    public function __construct(array $query = [], array $request = [], array $attributes = [], array $cookies = [], array $files = [], array $server = [], $content = null)
    {
        request()->merge(['dari'=>auth()->id()]);

        parent::__construct($query, $request, $attributes, $cookies, $files, $server, $content);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ke'=>'required|exists:users,id',
            'pesan'=>'required',
            'dari'=>'required|exists:users,id'
        ];
    }

}