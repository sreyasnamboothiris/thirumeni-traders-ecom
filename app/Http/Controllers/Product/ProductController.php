<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/ProductIndexPage');
    }

    public function create()
    {
        return Inertia::render('Product/ProductCreatePage');
    }

    public function store(Request $request)
    {
        dd($request->all());

        return Inertia::render('Product/ProductCreatePage');
    }
}
