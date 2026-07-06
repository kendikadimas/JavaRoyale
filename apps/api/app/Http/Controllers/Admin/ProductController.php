<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\NutritionFact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::withCount('variants')->latest()->paginate(15);
        return view('admin.products.index', compact('products'));
    }

    public function create()
    {
        return view('admin.products.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:255',
            'slug'            => 'nullable|string|max:255|unique:products,slug',
            'sort_order'      => 'nullable|integer|min:0',
            'description'     => 'nullable|string',
            'advantages'      => 'nullable|array',
            'advantages.*'    => 'nullable|string|max:255',
            'ingredients'     => 'nullable|array',
            'ingredients.*'   => 'nullable|string|max:255',
            'is_active'       => 'boolean',
            // product-level images
            'images'          => 'nullable|array',
            'images.*'        => 'nullable|image|max:10240',
            // nutrition facts (di produk)
            'nutrition.energy_kcal' => 'nullable|numeric',
            'nutrition.protein_g'   => 'nullable|numeric',
            'nutrition.fat_g'       => 'nullable|numeric',
            'nutrition.carbs_g'     => 'nullable|numeric',
            'nutrition.sugar_g'     => 'nullable|numeric',
            'nutrition.sodium_mg'   => 'nullable|numeric',
            // variants (opsional, hanya nama, berat, compliance, images)
            'variants'                       => 'nullable|array',
            'variants.*.variant_name'        => 'required_with:variants|string|max:255',
            'variants.*.net_weight'          => 'nullable|string|max:50',
            'variants.*.compliance_notes'    => 'nullable|string',
            'variants.*.images'              => 'nullable|array',
            'variants.*.images.*'            => 'nullable|image|max:10240',
        ]);

        $data['slug']        = $data['slug'] ?: Str::slug($data['name']);
        $data['is_active']   = $request->boolean('is_active', true);
        $data['sort_order']  = (int) $request->input('sort_order', 0);
        $data['advantages']  = array_filter($request->input('advantages', []));
        $data['ingredients'] = array_values(array_filter($request->input('ingredients', [])));

        $product = Product::create($data);

        // Nutrition facts di produk
        $nutrition = $request->input('nutrition', []);
        if (array_filter($nutrition)) {
            $product->nutritionFact()->create($nutrition);
        }

        // Product-level images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $file) {
                $path = $file->store('products', 'public');
                ProductImage::create([
                    'product_id'         => $product->id,
                    'product_variant_id' => null,
                    'image_path'         => $path,
                    'alt_text'           => $product->name,
                    'order'              => $idx,
                ]);
            }
        }

        // Variants (opsional)
        foreach ($request->input('variants', []) as $idx => $varData) {
            if (empty($varData['variant_name'])) continue;

            $variant = $product->variants()->create([
                'variant_name'     => $varData['variant_name'],
                'net_weight'       => $varData['net_weight'] ?? null,
                'compliance_notes' => $varData['compliance_notes'] ?? null,
            ]);

            // Variant images
            $variantFiles = $request->file("variants.{$idx}.images") ?? [];
            foreach ($variantFiles as $imgIdx => $file) {
                $path = $file->store('products', 'public');
                ProductImage::create([
                    'product_id'         => $product->id,
                    'product_variant_id' => $variant->id,
                    'image_path'         => $path,
                    'alt_text'           => $variant->variant_name,
                    'order'              => $imgIdx,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dibuat.');
    }

    public function edit(Product $product)
    {
        $product->load(['images', 'nutritionFact', 'variants.images']);
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:255',
            'slug'            => 'nullable|string|max:255|unique:products,slug,' . $product->id,
            'sort_order'      => 'nullable|integer|min:0',
            'description'     => 'nullable|string',
            'advantages'      => 'nullable|array',
            'advantages.*'    => 'nullable|string|max:255',
            'ingredients'     => 'nullable|array',
            'ingredients.*'   => 'nullable|string|max:255',
            'is_active'       => 'boolean',
            'images'          => 'nullable|array',
            'images.*'        => 'nullable|image|max:10240',
            'delete_images'   => 'nullable|array',
            'delete_images.*' => 'nullable|integer',
            // nutrition facts (di produk)
            'nutrition.energy_kcal' => 'nullable|numeric',
            'nutrition.protein_g'   => 'nullable|numeric',
            'nutrition.fat_g'       => 'nullable|numeric',
            'nutrition.carbs_g'     => 'nullable|numeric',
            'nutrition.sugar_g'     => 'nullable|numeric',
            'nutrition.sodium_mg'   => 'nullable|numeric',
            // variants
            'variants'                       => 'nullable|array',
            'variants.*.id'                  => 'nullable|integer',
            'variants.*.variant_name'        => 'required_with:variants|string|max:255',
            'variants.*.net_weight'          => 'nullable|string|max:50',
            'variants.*.compliance_notes'    => 'nullable|string',
            'variants.*.images'              => 'nullable|array',
            'variants.*.images.*'            => 'nullable|image|max:10240',
            'variants.*.delete_images'       => 'nullable|array',
            'variants.*.delete_images.*'     => 'nullable|integer',
        ]);

        $data['slug']        = $data['slug'] ?: Str::slug($data['name']);
        $data['is_active']   = $request->boolean('is_active', true);
        $data['advantages']  = array_filter($request->input('advantages', []));
        $data['ingredients'] = array_values(array_filter($request->input('ingredients', [])));
        $data['sort_order']  = (int) $request->input('sort_order', 0);

        $product->update($data);

        // Nutrition facts di produk
        $nutrition = $request->input('nutrition', []);
        if (array_filter($nutrition)) {
            $product->nutritionFact()->updateOrCreate(
                ['product_id' => $product->id],
                $nutrition
            );
        } else {
            $product->nutritionFact()->delete();
        }

        // Delete selected product-level images (ownership verified)
        foreach ($request->input('delete_images', []) as $imgId) {
            $img = ProductImage::where('id', $imgId)
                ->where('product_id', $product->id)
                ->whereNull('product_variant_id')
                ->first();
            if ($img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        // New product-level images
        if ($request->hasFile('images')) {
            $maxOrder = $product->images()->max('order') ?? -1;
            foreach ($request->file('images') as $idx => $file) {
                $path = $file->store('products', 'public');
                ProductImage::create([
                    'product_id'         => $product->id,
                    'product_variant_id' => null,
                    'image_path'         => $path,
                    'alt_text'           => $product->name,
                    'order'              => $maxOrder + $idx + 1,
                ]);
            }
        }

        // Sync variants
        $submittedVariantIds = [];
        foreach ($request->input('variants', []) as $idx => $varData) {
            if (empty($varData['variant_name'])) continue;

            $variantData = [
                'variant_name'     => $varData['variant_name'],
                'net_weight'       => $varData['net_weight'] ?? null,
                'compliance_notes' => $varData['compliance_notes'] ?? null,
            ];

            if (!empty($varData['id'])) {
                $variant = ProductVariant::where('id', $varData['id'])
                    ->where('product_id', $product->id)
                    ->first();
                if ($variant) {
                    $variant->update($variantData);
                    $submittedVariantIds[] = $variant->id;
                } else {
                    continue;
                }
            } else {
                $variant = $product->variants()->create($variantData);
                $submittedVariantIds[] = $variant->id;
            }

            // Delete selected variant images (ownership verified)
            foreach ($varData['delete_images'] ?? [] as $imgId) {
                $img = ProductImage::where('id', $imgId)
                    ->where('product_id', $product->id)
                    ->where('product_variant_id', $variant->id)
                    ->first();
                if ($img) {
                    Storage::disk('public')->delete($img->image_path);
                    $img->delete();
                }
            }

            // New variant images
            $variantFiles = $request->file("variants.{$idx}.images") ?? [];
            if ($variantFiles) {
                $maxOrder = $variant->images()->max('order') ?? -1;
                foreach ($variantFiles as $imgIdx => $file) {
                    $path = $file->store('products', 'public');
                    ProductImage::create([
                        'product_id'         => $product->id,
                        'product_variant_id' => $variant->id,
                        'image_path'         => $path,
                        'alt_text'           => $variant->variant_name,
                        'order'              => $maxOrder + $imgIdx + 1,
                    ]);
                }
            }
        }

        // Remove variants not in the submission
        $product->variants()->whereNotIn('id', $submittedVariantIds)->each(function ($v) {
            foreach ($v->images as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
            $v->delete();
        });

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        $product->load('allImages');
        foreach ($product->allImages as $img) {
            Storage::disk('public')->delete($img->image_path);
        }
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus.');
    }
}