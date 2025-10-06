<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TempleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $templeId = 2;

        return [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'address' => 'nullable|string',
            'contact' => 'nullable|string|max:20',
            'email' => [
                'nullable',
                'email',
                'max:255',
                'unique:users,email' . ($templeId ? ",$templeId" : '')
            ],
            'location' => 'nullable|string|max:255',

            'prathishta_month' => 'nullable|string|max:255',
            'prathishta_star' => 'nullable|string|max:255',
            'ulsavam_start_month' => 'nullable|string|max:255',
            'ulsavam_start_star' => 'nullable|string|max:255',
            'ulsavam_end_month' => 'nullable|string|max:255',
            'ulsavam_end_star' => 'nullable|string|max:255',

            'google_map_location' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Temple name is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already used by another user.',
        ];
    }
}
