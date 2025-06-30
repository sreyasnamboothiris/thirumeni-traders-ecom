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
        Schema::create('temples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        
            $table->string('name')->nullable();
            $table->text('address')->nullable();
            
            $table->string('phone_number')->nullable();
            $table->string('secondary_phone_number')->nullable();
        
            $table->string('email')->nullable();
            $table->string('location')->nullable();
        
            $table->string('prathishta_month')->nullable();
            $table->string('prathishta_star')->nullable();
            $table->string('ulsavam_start_month')->nullable();
            $table->string('ulsavam_start_star')->nullable();
            $table->string('ulsavam_end_month')->nullable();
            $table->string('ulsavam_end_star')->nullable();
        
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->text('google_map_location')->nullable();
        
            $table->timestamps();
        });
    

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temples');
    }
};
