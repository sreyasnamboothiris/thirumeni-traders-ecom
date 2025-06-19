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
       Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->string('name')->nullable();
            $table->text('address')->nullable();
            $table->string('contact')->nullable();
            $table->string('email')->nullable();
            $table->string('location')->nullable();
            $table->enum('shop_type', ['wholesale', 'retail', 'bid'])->nullable();
            $table->text('google_map_location')->nullable();

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shops');
    }
};
