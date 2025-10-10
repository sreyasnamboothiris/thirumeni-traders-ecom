<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q          = $request->input('q');
        $categoryId = $request->input('category_id');
        $brandId    = $request->input('brand_id');
        $status     = $request->input('status');

        $sort   = $request->input('sort', 'created_at');
        $order  = $request->input('order', 'desc');
        $perPage = $request->input('per_page', 15);

        $query = Product::query()
            ->when($q, fn($x) =>
                $x->where(fn($y) =>
                    $y->where('name', 'like', "%{$q}%")
                      ->orWhere('sku', 'like', "%{$q}%")
                      ->orWhere('slug', 'like', "%{$q}%")
                )
            )
            ->when($categoryId, fn($x) => $x->where('category_id', $categoryId))
            ->when($brandId, fn($x) => $x->where('brand_id', $brandId))
            ->when($status, fn($x) => $x->where('status', $status));

        $sortable = ['name', 'price_sell', 'created_at', 'id'];
        if (! in_array($sort, $sortable)) {
            $sort = 'created_at';
        }

        $products = $query->orderBy($sort, $order)->paginate($perPage);

        return response()->json($products);
    }

    /**
     * POST /products
     */
    public function store(ProductRequest $request)
    {
        $data = $request->validated();

        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $product = Product::create($data);

        return response()->json([
            'message' => 'Product created successfully',
            'data'    => $product
        ], 201);
    }

    /**
     * GET /products/{product}
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * PUT /products/{product}
     */
    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $product->update($data);

        return response()->json([
            'message' => 'Product updated successfully',
            'data'    => $product->fresh()
        ]);
    }

    /**
     * DELETE /products/{product}
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
