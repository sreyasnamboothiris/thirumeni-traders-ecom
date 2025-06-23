<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Temple extends Model
{
    protected $fillable = [
        'user_id', 'name', 'address', 'contact', 'email', 'location',
        'prathishta_month', 'prathishta_star',
        'ulsavam_start_month', 'ulsavam_start_star',
        'ulsavam_end_month', 'ulsavam_end_star',
        'status', 'google_map_location',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
}
