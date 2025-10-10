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
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role_id' => $templeRoleId,
        ]);

        $temple = Temple::create(array_merge(
            $request->validated(),
            ['user_id' => $user->id]
        ));

        // dd($temple);
        return redirect()
            ->route('temple.index')
            ->with('message', 'Temple created successfully');
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
        $temple = Temple::with('user')->findOrFail($templeId);
        $validated = $request->validated();

        // --- Update the related User ---
        if ($temple->user) {
            $temple->user->update([
                'name' => $validated['name'] ?? $temple->user->name,
                'username' => $validated['username'] ?? $temple->user->username,
                'email' => $validated['email'] ?? $temple->user->email,
                'password' => ! empty($validated['password'])
                    ? \Hash::make($validated['password'])
                    : $temple->user->password, // keep old password if not updated
            ]);
        }

        // --- Remove user fields before updating temple ---
        unset(
            $validated['name'],
            $validated['username'],
            $validated['email'],
            $validated['password'],
            $validated['confirm_password']
        );

        // --- Update the temple data ---
        $temple->update($validated);

        // --- Redirect to index with success message ---
        return redirect()
            ->route('temple.index')
            ->with('message', 'Temple updated successfully');
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
