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
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Basic info
            $table->string('sku')->nullable()->unique();       // Stock Keeping Unit
            $table->string('name')->nullable();                // Product name
            $table->string('slug')->nullable()->unique();      // for URLs

            // Categorization
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();

            // Pricing
            $table->decimal('price_mrp', 12, 2)->nullable();    // MRP/List Price
            $table->decimal('price_sell', 12, 2)->nullable();   // Selling Price
            $table->decimal('cost_price', 12, 2)->nullable();   // Cost price
            $table->decimal('tax_rate', 5, 2)->nullable();      // GST/VAT %

            // Inventory
            $table->integer('stock_qty')->nullable();           // Current available qty
            $table->integer('reorder_point')->nullable();       // Min stock level
            $table->integer('reorder_qty')->nullable();         // Suggested order qty

            // Physical attributes (optional)
            $table->integer('weight_grams')->nullable();
            $table->integer('length_mm')->nullable();
            $table->integer('width_mm')->nullable();
            $table->integer('height_mm')->nullable();

            // Extra info
            $table->longText('description')->nullable();
            $table->string('thumbnail_url')->nullable();

            // Status
            $table->enum('status', ['draft','active','archived'])
                  ->nullable()
                  ->default('active');

            $table->timestamps();

            // Optional indexes
            $table->index(['name', 'sku']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
