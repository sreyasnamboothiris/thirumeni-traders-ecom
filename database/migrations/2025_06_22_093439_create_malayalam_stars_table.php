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
       Schema::create('malayalam_stars', function (Blueprint $table) {
            $table->id();
            $table->string('name_en'); // English name e.g., Ashwathi
            $table->string('name_ml'); // Malayalam name e.g., അശ്വതി
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('malayalam_stars');
    }
};
