<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
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
                'unique:permissions,name',
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
