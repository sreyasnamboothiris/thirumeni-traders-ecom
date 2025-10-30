<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;


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

    public function store(ProductRequest $request): RedirectResponse
    {
        // dd($request->all());
        $data = $request->validated();

        // DB::beginTransaction();
        try {
            // 1) create product (validated does not include uploaded files)
            $product = Product::create($data);

            // 2) handle uploaded images (input name: images[])
            if ($request->hasFile('images')) {
                $files = $request->file('images');

                foreach ($files as $index => $file) {
                    if (! $file->isValid()) {
                        continue;
                    }

                    // create unique filename inside products/ directory
                    $ext = $file->getClientOriginalExtension();
                    $filename = 'products/' . (string) Str::uuid() . '.' . $ext;

                    // store file in storage/app/public/products
                    Storage::disk('public')->putFileAs('products', $file, basename($filename));

                    // create DB record
                    ProductImage::create([
                        'product_id'    => $product->id,
                        'imageable_type'=> \App\Models\Product::class, // optional, keep for compatibility
                        'image_path'    => $filename, // relative to storage/app/public
                        'original_name' => $file->getClientOriginalName(),
                        'mime_type'     => $file->getClientMimeType(),
                        'size'          => $file->getSize(),
                        'is_thumbnail'  => $index === 0 ? true : false, // mark first as thumbnail
                        'order'         => $index,
                    ]);
                }
            }

            // DB::commit();

            return redirect()->route('product.index')->with('message', 'Product created successfully.');
        } catch (\Throwable $e) {
            // DB::rollBack();
            \Log::error('Product store error: ' . $e->getMessage(), ['exception' => $e]);

            return redirect()->back()
                ->withInput()
                ->withErrors(['server' => 'Unable to save product. Check logs.']);
        }
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
