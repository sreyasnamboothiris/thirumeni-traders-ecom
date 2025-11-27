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
use Illuminate\Support\Facades\Schema; 



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
    // validate & get data
    $data = $request->validated();

    DB::beginTransaction();
    try {
        // 1) create product
        $product = Product::create($data);

        $createdThumbnailPath = null;

        // 2) handle explicit thumbnail upload (input 'thumbnail')
        if ($request->hasFile('thumbnail') && $request->file('thumbnail')->isValid()) {
            $thumbFile = $request->file('thumbnail');
            $ext = $thumbFile->getClientOriginalExtension();
            $thumbPath = 'products/' . (string) Str::uuid() . '.' . $ext;

            // store file under storage/app/public/products
            Storage::disk('public')->putFileAs('products', $thumbFile, basename($thumbPath));
            $createdThumbnailPath = $thumbPath;

            // create db record for thumbnail
            ProductImage::create([
                'product_id'     => $product->id,
                'imageable_type' => \App\Models\Product::class,
                'image_path'     => $thumbPath,
                'original_name'  => $thumbFile->getClientOriginalName(),
                'mime_type'      => $thumbFile->getClientMimeType(),
                'size'           => $thumbFile->getSize(),
                'is_thumbnail'   => 1,
                'order'          => 0,
            ]);

            // Optionally persist thumbnail path on product row if your schema has such a column
            if (Schema::hasColumn('products', 'product_thumbnail_url')) {
                $product->product_thumbnail_url = $thumbPath;
                $product->save();
            } elseif (Schema::hasColumn('products', 'thumbnail_url')) {
                $product->thumbnail_url = $thumbPath;
                $product->save();
            }
        }

        // 3) handle gallery images (images[])
        if ($request->hasFile('images')) {
            $files = $request->file('images');

            foreach ($files as $index => $file) {
                if (! $file->isValid()) {
                    continue;
                }

                $ext = $file->getClientOriginalExtension();
                $filename = 'products/' . (string) Str::uuid() . '.' . $ext;
                Storage::disk('public')->putFileAs('products', $file, basename($filename));

                // Decide thumbnail flag:
                // - If a dedicated thumbnail was uploaded, gallery items are NOT thumbnails.
                // - If NO dedicated thumbnail, mark the first gallery image (index 0) as thumbnail.
                $isThumb = $createdThumbnailPath ? 0 : ($index === 0 ? 1 : 0);

                ProductImage::create([
                    'product_id'     => $product->id,
                    'imageable_type' => \App\Models\Product::class,
                    'image_path'     => $filename,
                    'original_name'  => $file->getClientOriginalName(),
                    'mime_type'      => $file->getClientMimeType(),
                    'size'           => $file->getSize(),
                    'is_thumbnail'   => $isThumb,
                    'order'          => ($createdThumbnailPath ? $index + 1 : $index),
                ]);

                if ($isThumb) {
                    if (Schema::hasColumn('products', 'product_thumbnail_url')) {
                        $product->product_thumbnail_url = $filename;
                        $product->save();
                    } elseif (Schema::hasColumn('products', 'thumbnail_url')) {
                        $product->thumbnail_url = $filename;
                        $product->save();
                    }
                }
            }
        }

        // 4) Normalize: make sure only one image has is_thumbnail = 1
        $thumbs = ProductImage::where('product_id', $product->id)->where('is_thumbnail', 1)->orderBy('order')->get();
        if ($thumbs->count() > 1) {
            $keep = $thumbs->first();
            $others = $thumbs->slice(1);
            foreach ($others as $other) {
                $other->is_thumbnail = 0;
                $other->save();
            }
            if ($keep) {
                if (Schema::hasColumn('products', 'product_thumbnail_url')) {
                    $product->product_thumbnail_url = $keep->image_path;
                    $product->save();
                } elseif (Schema::hasColumn('products', 'thumbnail_url')) {
                    $product->thumbnail_url = $keep->image_path;
                    $product->save();
                }
            }
        }

        DB::commit();

        // Redirect to product list (HTTP 302)
        return redirect()->route('product.index')
            ->with('message', 'Product created successfully.');

    } catch (\Throwable $e) {
       DB::rollBack();

     return redirect()->route('product.create')
            ->withInput()
            ->withErrors(['server' => $e->getMessage()]);
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
