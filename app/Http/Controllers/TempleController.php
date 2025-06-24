<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

    public function store(TempleRequest $request)
    {
        $templeRoleId = Role::where('slug', 'temple')->value('id');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email ?? uniqid().'@temple.local',
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
