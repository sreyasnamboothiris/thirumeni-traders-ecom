<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/UserManagement/Customer/CustomerIndexPage');
    }

    public function create()
    {
        return Inertia::render('Admin/UserManagement/Customer/CustomerCreatePage');
    }

    public function store(Request $request) {}

    public function edit($id)
    {
        $customer = null;

        return Inertia::render('Admin/UserManagement/Customer/CustomerEditPage', [
            'customer' => $customer,
        ]);
    }
}
