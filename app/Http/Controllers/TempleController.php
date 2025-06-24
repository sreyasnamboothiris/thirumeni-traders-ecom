<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TempleRequest;
use App\Models\MalayalamMonth;
use App\Models\MalayalamStar;
use App\Models\Role;
use App\Models\Temple;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TempleController extends Controller
{
    public function index()
    {
        $temples = Temple::with('user')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $temples
        ]);
    }

    public function create()
    {
        $stars = MalayalamStar::all();
        $roles = Role::all();
        $months = MalayalamMonth::all();
        return Inertia::render('Admin/UserManagement/UserCreate', [
            'user_type' => 'temple',
            'stars' => $stars,
            'roles' => $roles,
            'months' => $months
        ]);
    }

    public function store(TempleRequest $request)
    {
        $templeRoleId = Role::where('slug', 'temple')->value('id');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email ?? uniqid() . '@temple.local',
            'password' => Hash::make('password'),
            'role_id' => $templeRoleId,
        ]);

        $temple = Temple::create(array_merge(
            $request->validated(),
            ['user_id' => $user->id]
        ));

        return response()->json([
            'success' => true,
            'message' => 'Temple created successfully',
            'data' => $temple,
        ], 201);
    }

    public function show(Temple $temple)
    {
        return response()->json([
            'success' => true,
            'data' => $temple
        ]);
    }

    public function update(TempleRequest $request, Temple $temple)
    {
        $temple->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Temple updated successfully',
            'data' => $temple,
        ]);
    }

    public function destroy(Temple $temple)
    {
        $temple->delete();

        return response()->json([
            'success' => true,
            'message' => 'Temple deleted successfully',
        ]);
    }
}
