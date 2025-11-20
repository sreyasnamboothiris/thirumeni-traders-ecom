<?php

use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\TempleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('/product', ProductController::class);
    Route::resource('/customer', CustomerController::class);
    Route::resource('/profile', ProfileController::class);
});
Route::resource('temple', TempleController::class);

// ###### test #####

Route::get('/ui/admin/dashboard', function () {
    return Inertia::render('Admin/AdminDashboard');
});

Route::get('/home', [HomeController::class, 'index'])->name('home');
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

require __DIR__.'/auth.php';
