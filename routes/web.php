<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

####### test #####

Route::get('/ui/admin/dashboard', function () {
    return Inertia::render('Admin/AdminDashboard');
});
Route::get('/ui/admin/user-management', function () {
    $userType = request('user_type');

    return Inertia::render('Admin/UserManagement/UserIndex', [
        'user_type' => $userType,
    ]);
});
Route::get('/ui/admin/user-management/user-create', function () {
    $userType = request('user_type');
    return Inertia::render('Admin/UserManagement/UserCreate', [
        'user_type' => $userType,
    ]);
});



require __DIR__ . '/auth.php';
