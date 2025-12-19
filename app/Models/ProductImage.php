<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
    'product_id', 'imageable_type', 'image_path',
    'original_name', 'mime_type', 'size', 'is_thumbnail', 'order'
    ];
}
