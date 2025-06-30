<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin'], // Ensures no duplicate
            [
                'role_id' => 1, // Admin role ID
                'name'=>'admin',
                'email' => 'admin@thirumeni.com',
                'password' => Hash::make('password'), // 🔐 Change this later
                'preferred_language' => 'ENG',
                // 'qr_token' => Str::uuid(),
            ]
        );
    }
}
