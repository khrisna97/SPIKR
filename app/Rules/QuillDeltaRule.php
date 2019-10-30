<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use nadar\quill\Lexer;

class QuillDeltaRule implements Rule
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
        $value = json_decode($value);
        if (! $value->ops){
            $this->message = 'format konten tidak sesuai';
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
