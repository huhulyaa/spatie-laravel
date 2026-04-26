<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\StrongPassword;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($this->route('user'))],
            'password' => ['nullable', new StrongPassword()],
            'is_active' => ['boolean'],
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['integer', 'exists:roles,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Full name is required.',
            'name.string' => 'Full name must be a valid string.',
            'name.max' => 'Full name cannot exceed 255 characters.',

            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'Email address is already taken.',

            'password.nullable' => 'Invalid password format.',
            'password.required' => 'Password is required.',

            'is_active.boolean' => 'Invalid status format.',

            'roles.required' => 'Please select at least one role for the user.',
            'roles.min' => 'Please select at least one role for the user.',
            'roles.array' => 'Invalid role format.',
            'roles.*.integer' => 'Invalid role format.',
            'roles.*.exists' => 'Selected role does not exist.',
        ];
    }
}
