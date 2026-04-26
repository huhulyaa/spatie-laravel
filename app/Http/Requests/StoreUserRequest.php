<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\StrongPassword;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', new StrongPassword()],
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['integer', 'exists:roles,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'roles.required' => 'Please select at least one role for the user.',
            'roles.min' => 'Please select at least one role for the user.',
            'roles.array' => 'Invalid role format.',
            'roles.*.integer' => 'Invalid role format.',
            'roles.*.exists' => 'Selected role does not exist.',
            'name.required' => 'Full name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'Email address is already taken.',
            'password.required' => 'Password is required.',
        ];
    }
}
