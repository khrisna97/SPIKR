<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKelompok extends CreateKelompok
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        foreach ($this->customRule as $key =>$rule){
            $string = str_replace('required','sometimes',join("|",$rule));
            $this->customRule[$key] = explode('|', $string);
        }
        return $this->customRule;
    }
}
