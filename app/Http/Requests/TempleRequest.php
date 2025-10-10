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
    // $this->route('temple') can be:
    // - a Temple model (if route model binding is configured)
    // - an integer id (if route uses param)
    $routeTemple = $this->route('temple');

    // Try to resolve Temple model reliably
    if (is_numeric($routeTemple)) {
        $templeModel = \App\Models\Temple::with('user')->find($routeTemple);
    } else {
        // could be null or a Temple model
        $templeModel = $routeTemple;
    }

    // Get the user id to exclude from unique checks (if present)
    $userId = $templeModel?->user?->id ?? null;
    // dd();
    return [
        'name' => 'required|string|max:255',

        'username' => [
            'required',
            'string',
            'max:255',
            // exclude current user id when updating; if null, unique acts normally
            'unique:users,username' . ($userId ? (',' . $userId . ',id') : ''),
        ],

        'email' => [
            'nullable',
            'email',
            'max:255',
            'unique:users,email' . ($userId ? (',' . $userId . ',id') : ''),
        ],

        // password: required on create (POST), optional on update (PUT/PATCH)
        'password' => [
            $this->isMethod('post') ? 'required' : 'nullable',
            'string',
            'min:6',
            // NOTE: we are not using 'confirmed' because your form uses confirm_password
            // If you switch frontend to password_confirmation, you can uncomment 'confirmed'
            // 'confirmed',
        ],

        // if your frontend uses confirm_password, validate it explicitly
        'confirm_password' => [
            'required_with:password',
            'same:password',
        ],

        'address' => 'nullable|string',
        'contact' => 'nullable|string|max:20',
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
