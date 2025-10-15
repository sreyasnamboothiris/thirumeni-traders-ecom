<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
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

    public function store(ProductRequest $request)
    {
        $validated = $request->validated();

        return Inertia::render('Product/ProductCreatePage');
    }
}
