<?php

namespace App\Http\Controllers;

use App\Http\Requests\TempleRequest;
use App\Models\MalayalamMonth;
use App\Models\MalayalamStar;
use App\Models\Role;
use App\Models\Temple;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TempleController extends Controller
{
    public function index()
    {
        $temples = Temple::with('user')->get();

        return Inertia::render('Admin/UserManagement/UserIndex', [
            'user_type' => 'temple',
            'users' => $temples,
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
            'months' => $months,
        ]);
    }

    public function store(TempleRequest $request)
    {

        $templeRoleId = Role::where('slug', 'temple')->value('id');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email ?? uniqid().'@temple.local',
            'username' => $request->username,
            'password' => Hash::make('password'),
            'role_id' => $templeRoleId,
        ]);

        $temple = Temple::create(array_merge(
            $request->validated(),
            ['user_id' => $user->id]
        ));

        return redirect()->back()->with(['message' => 'Temple created successfully']);
    }

    public function show(int $templeId)
    {
        $temple = Temple::with('user')->findOrFail($templeId);

        return Inertia::render('Admin/UserManagement/UserShow', [
            'user_type' => 'temple',
            'user' => $temple,
        ]);
    }

    public function update(TempleRequest $request, int $templeId)
    {
        $temple = Temple::findOrFail($templeId);
        $temple->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Temple updated successfully',
            'data' => $temple,
        ]);
    }

    public function edit(int $templeId)
    {
        $stars = MalayalamStar::all();
        $months = MalayalamMonth::all();
        $roles = Role::all();
        $temple = Temple::with('user')->findOrFail($templeId);

        return Inertia::render('Admin/UserManagement/UserCreate', [
            'user_type' => 'temple',
            'user' => $temple,
            'stars' => $stars,
            'roles' => $roles,
            'months' => $months,
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
