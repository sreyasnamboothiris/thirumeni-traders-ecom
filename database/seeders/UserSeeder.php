<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRoleId = Role::where('slug', 'admin')->value('id');

        // Insert or update Admin user
        User::updateOrCreate(
            ['email' => 'admin@thirumenitraders.com'],
            [
                'role_id'  => $adminRoleId,
                'name'     => 'Super Admin',
                'username' => 'admin',
                'password' => Hash::make('admin123#'),
                'preferred_language' => 'ENG',
            ]
        );
    }
}