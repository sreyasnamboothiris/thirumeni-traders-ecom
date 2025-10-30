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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();   
            $table->unsignedBigInteger('product_id');
            $table->string('imageable_type');

            // stored relative path on public disk, e.g. images/uuid.jpg
            $table->string('image_path');

            // optional metadata
            $table->string('original_name')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size')->nullable(); // bytes
            $table->boolean('is_thumbnail')->default(false);

            $table->integer('order')->default(0);
            $table->timestamps();

            // indexes for faster polymorphic queries
            $table->index(['product_id', 'imageable_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
