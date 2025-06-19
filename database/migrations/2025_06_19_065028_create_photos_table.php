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
       Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('photoable_id');
            $table->string('photoable_type');
            $table->string('image_path');
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->index(['photoable_id', 'photoable_type']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
