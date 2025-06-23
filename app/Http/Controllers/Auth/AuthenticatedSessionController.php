<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Role;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
    // This handles validation and login
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        // Optional: Ensure only admin or temple role can login
        $allowedRoles = ['admin', 'temple'];
        $roleSlug = $user->role->slug ?? null;

        if (!in_array($roleSlug, $allowedRoles)) {
            Auth::logout();
            return redirect()->route('login')->withErrors([
                'email' => 'Only admin or temple users can login.',
            ]);
        }

        // Redirect based on role
        if ($roleSlug === 'admin') {
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        if ($roleSlug === 'temple') {
            return redirect()->intended(route('temple.dashboard', absolute: false));
        }

        // Default fallback
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
