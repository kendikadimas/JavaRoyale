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
        // 1. Add ingredients to products if not exists
        if (!Schema::hasColumn('products', 'ingredients')) {
            Schema::table('products', function (Blueprint $table) {
                $table->json('ingredients')->nullable()->after('advantages');
            });
        }

        // 2. Add nutrition_fact to products (one-to-one relation)
        // Drop old product_variant_id if exists, add product_id
        if (Schema::hasColumn('nutrition_facts', 'product_variant_id')) {
            Schema::table('nutrition_facts', function (Blueprint $table) {
                $table->dropForeign(['product_variant_id']);
                $table->dropUnique(['product_variant_id']);
                $table->dropColumn('product_variant_id');
            });
        }

        // Add product_id if not exists
        if (!Schema::hasColumn('nutrition_facts', 'product_id')) {
            Schema::table('nutrition_facts', function (Blueprint $table) {
                $table->foreignId('product_id')->after('id')->unique()->constrained()->cascadeOnDelete();
            });
        }

        // 3. Drop ingredients from product_variants if exists
        if (Schema::hasColumn('product_variants', 'ingredients')) {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->dropColumn('ingredients');
            });
        }
    }

    public function down(): void
    {
        // Reverse step 3
        if (!Schema::hasColumn('product_variants', 'ingredients')) {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->json('ingredients')->nullable()->after('variant_name');
            });
        }

        // Reverse step 2
        Schema::table('nutrition_facts', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropUnique(['product_id']);
            $table->dropColumn('product_id');
        });
        Schema::table('nutrition_facts', function (Blueprint $table) {
            $table->unsignedBigInteger('product_variant_id')->nullable()->after('id');
        });
        DB::table('nutrition_facts')->delete();
        Schema::table('nutrition_facts', function (Blueprint $table) {
            $table->foreign('product_variant_id')->references('id')->on('product_variants')->cascadeOnDelete();
            $table->unique('product_variant_id');
        });

        // Reverse step 1
        if (Schema::hasColumn('products', 'ingredients')) {
            Schema::table('products', function (Blueprint $table) {
                $table->dropColumn('ingredients');
            });
        }
    }
};
