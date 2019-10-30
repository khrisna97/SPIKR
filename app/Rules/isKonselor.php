<?php

namespace App\Rules;

use App\User;
use Illuminate\Contracts\Validation\Rule;

class isKonselor implements Rule
{
    public function passes($attribute, $value)
    {
        $id = request()->input('ketua');
        $user = User::find($id);
        if ($user === null)return  false;
        if ($user->role !== 2) return  false;
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'User yang di pilih bukan konselor / ketua kelompok.';
    }
}
