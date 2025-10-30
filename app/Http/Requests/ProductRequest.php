<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow all for now, handle with middleware/permissions later if needed
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id; // for update

        return [
            'sku' => ['nullable', 'string', 'max:100', Rule::unique('products', 'sku')->ignore($productId)],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($productId)],
            'category_id' => ['nullable', 'exists:categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],

            'price_mrp' => ['nullable', 'numeric', 'min:0'],
            'price_sell' => ['nullable', 'numeric', 'min:0'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'tax_rate' => ['nullable', 'numeric', 'min:0'],

            'stock_qty' => ['nullable', 'integer', 'min:0'],
            'reorder_point' => ['nullable', 'integer', 'min:0'],
            'reorder_qty' => ['nullable', 'integer', 'min:0'],

            'weight_grams' => ['nullable', 'numeric', 'min:0'],
            'length_mm' => ['nullable', 'numeric', 'min:0'],
            'width_mm' => ['nullable', 'numeric', 'min:0'],
            'height_mm' => ['nullable', 'numeric', 'min:0'],

            'thumbnail_url' => ['nullable', 'url'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
            'description' => ['nullable', 'string'],
            'images' => ['nullable','array'],
            'images.*' => ['file','image','max:5120'],

        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required',
            'sku.unique' => 'This SKU already exists',
            'slug.unique' => 'This slug already exists',
        ];
    }
}
