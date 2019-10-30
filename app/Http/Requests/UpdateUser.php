<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use function Symfony\Component\Debug\Tests\testHeader;

class UpdateUser extends CreateUser
{
    public function rules()
    {
        foreach ($this->customrule as $key =>$rule){
            $this->customrule[$key] = str_replace('required','sometimes',$rule);
            if (in_array($key,['nomor-ktp','username','email'])){
                $this->customrule[$key] = $this->customrule[$key].",".request()->route()->parameter('id');
            }
            if ($key === 'password'){
                $newrule = str_replace('confirmed','',$rule);
                $this->customrule['password'] = str_replace('required','sometimes',$newrule);
                $this->customrule['new_pass'] = $this->customrule['password'];
            }
        }
        return $this->customrule;
    }
}
