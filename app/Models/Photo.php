<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = ['temple_id', 'shop_id', 'path', 'type'];

    public function temple()
    {
        return $this->belongsTo(Temple::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
