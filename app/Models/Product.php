<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $fillable = [
        'sku',
        'name',
        'slug',
        'category_id',
        'brand_id',
        'price_sell',
        'price_buy',
        'price_discount',
        'stock',
        'length_mm',
        'width_mm',
        'height_mm',
        'description',
        'thumbnail_url',
        'status',
    ];
}
