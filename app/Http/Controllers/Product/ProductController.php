<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->input('q');
        $categoryId = $request->input('category_id');
        $brandId = $request->input('brand_id');
        $status = $request->input('status');

        $sort = $request->input('sort', 'created_at');
        $order = $request->input('order', 'desc');
        $perPage = $request->input('per_page', 15);

        $query = Product::query()
            ->when($q, fn ($x) => $x->where(fn ($y) => $y->where('name', 'like', "%{$q}%")
                ->orWhere('sku', 'like', "%{$q}%")
                ->orWhere('slug', 'like', "%{$q}%")
            )
            )
            ->when($categoryId, fn ($x) => $x->where('category_id', $categoryId))
            ->when($brandId, fn ($x) => $x->where('brand_id', $brandId))
            ->when($status, fn ($x) => $x->where('status', $status));

        $sortable = ['name', 'price_sell', 'created_at', 'id'];
        if (! in_array($sort, $sortable)) {
            $sort = 'created_at';
        }

        $products = $query->orderBy($sort, $order)->paginate($perPage);

        return Inertia::render('Product/ProductIndexPage', [
            'products' => $products,
        ]);
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
            'product' => $product,
        ]);
    }

    public function update(ProductRequest $request, Product $product)
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
