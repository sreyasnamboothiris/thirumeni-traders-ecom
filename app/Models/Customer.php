<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $fillable = [
        'user_id',
        'username',
        'password',
        'full_name',
        'phone',
        'email',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'pincode',
        'country',
        'delivery_instructions',
        'profile_image',
        'loyalty_points',
        'is_active',
        'last_login_at',
        'role',
    ];
}
