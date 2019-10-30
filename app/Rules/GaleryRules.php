<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class GaleryRules implements Rule
{

    private $message;

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {

        $files = request()->allFiles()['images'];
        $captions = request()->input('captions');
        if (count($files) !== count($captions)){
            $this->message = 'Jumlah file dan caption tidak sesuai';
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
