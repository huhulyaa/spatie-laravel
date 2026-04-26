<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StrongPassword implements ValidationRule
{

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strlen($value) < 8) {
            $fail('Password must be at least 8 characters.');
        }

        if (!preg_match('/[0-9]/', $value)) {
            $fail('Password must contain a number.');
        }
    }
}
