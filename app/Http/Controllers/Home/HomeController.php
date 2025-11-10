<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::paginate(12);
        $user = Auth::user();

        return Inertia::render('HomePage/HomeIndexPage', [
            'products' => $products,
            'user' => $user,
        ]);
    }
}
