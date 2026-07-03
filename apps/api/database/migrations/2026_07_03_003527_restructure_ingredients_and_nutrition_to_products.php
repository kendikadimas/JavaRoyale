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
        // 1. ingredients di products sudah ada (partial run sebelumnya)
        // Tambah hanya jika belum ada
        if (!Schema::hasColumn('products', 'ingredients')) {
            Schema::table('products', function (Blueprint $table) {
                $table->json('ingredients')->nullable()->after('advantages');
            });
        }

        // 2. nutrition_facts sudah punya product_id (partial run sebelumnya)
        // Hapus product_variant_id jika masih ada
        if (Schema::hasColumn('nutrition_facts', 'product_variant_id')) {
            Schema::table('nutrition_facts', function (Blueprint $table) {
                $table->dropForeign(['product_variant_id']);
                $table->dropUnique(['product_variant_id']);
                $table->dropColumn('product_variant_id');
            });
        }

        // Pastikan product_id sudah punya FK & unique (mungkin belum karena error)
        if (Schema::hasColumn('nutrition_facts', 'product_id')) {
            // Hapus orphan rows
            DB::table('nutrition_facts')->whereNotIn('product_id', DB::table('products')->pluck('id'))->delete();
            DB::table('nutrition_facts')->whereNull('product_id')->delete();

            // Coba enforce FK jika belum ada
            try {
                Schema::table('nutrition_facts', function (Blueprint $table) {
                    $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
                });
            } catch (\Exception $e) {
                // FK sudah ada, skip
            }
            try {
                Schema::table('nutrition_facts', function (Blueprint $table) {
                    $table->unique('product_id');
                });
            } catch (\Exception $e) {
                // Unique sudah ada, skip
            }
        }

        // 3. Hapus ingredients dari product_variants jika masih ada
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
