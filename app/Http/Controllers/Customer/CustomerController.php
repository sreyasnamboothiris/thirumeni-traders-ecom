<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\CustomerRequest;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::paginate(15);
        return Inertia::render('Admin/UserManagement/Customer/CustomerIndexPage',[
            'customers' => $customers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UserManagement/Customer/CustomerCreatePage');
    }

    public function store(CustomerRequest $request) {
        $customerRoleId = 4;    
           $user = User::create([
            'name' => $request->full_name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role_id' => $customerRoleId,
        ]);

        $customer = Customer::create(array_merge(
            $request->validated(),
            ['user_id' => $user->id]
        ));

        // dd($temple);
        return redirect()
            ->route('customer.index')
            ->with('message', 'Customer created successfully');
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return Inertia::render('Admin/UserManagement/Customer/CustomerEditPage', [
            'customer' => $customer,
        ]);
    }
}
