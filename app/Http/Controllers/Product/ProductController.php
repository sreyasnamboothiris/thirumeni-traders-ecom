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
        $data = $request->validated();

        $product = Product::create($data);
        return Inertia::render('Product/ProductCreatePage');
    }
    public function edit(Product $product)
    {
        return Inertia::render('Product/ProductCreatePage', [
            'product' => $product
        ]);
    }
    public function update(Request $request, Product $product)
    {
        $data = $request->validated();

        $product->update($data);

        return redirect()
            ->route('product.index')
            ->with('message', 'Product updated successfully');
    }
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()
            ->route('product.index')
            ->with('message', 'Product deleted successfully');
    }
}
