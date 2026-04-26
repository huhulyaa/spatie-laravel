<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('permissions', 'name')->ignore($this->route('permission')),
                'regex:/^[a-z0-9-]+$/',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex' => 'Use lowercase letters, numbers, and hyphens only. Example: manage-users, view-dashboard',
        ];
    }
}
