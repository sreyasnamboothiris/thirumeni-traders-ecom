<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('customers', function (Blueprint $table) {
            $table->id();

            // Link to users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // login / identity
            $table->string('username')->unique();
            $table->string('password'); // hashed
            $table->string('full_name');
            $table->string('phone')->nullable()->unique();
            $table->string('email')->nullable()->unique();

            // address
            $table->string('address_line1')->nullable();
            $table->string('address_line2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('pincode')->nullable();
            $table->string('country')->nullable()->default('India');

            // extras
            $table->text('delivery_instructions')->nullable();
            $table->string('profile_image')->nullable();
            $table->integer('loyalty_points')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->string('role')->default('customer');

            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            // indexes
            $table->index('username');
            $table->index('phone');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
