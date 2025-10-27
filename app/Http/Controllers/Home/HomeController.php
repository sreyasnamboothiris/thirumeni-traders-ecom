<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::paginate(12);

        return Inertia::render('HomePage/HomeIndexPage', [
            'products' => $products,
        ]);
    }
}
