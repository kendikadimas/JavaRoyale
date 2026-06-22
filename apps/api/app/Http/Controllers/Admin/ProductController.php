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
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:products,slug',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'advantages'  => 'nullable|array',
            'advantages.*'=> 'nullable|string|max:255',
            'is_active'   => 'boolean',
            'images'      => 'nullable|array',
            'images.*'    => 'nullable|image|max:2048',
            // variants
            'variants'                        => 'nullable|array',
            'variants.*.variant_name'         => 'required_with:variants|string|max:255',
            'variants.*.net_weight'           => 'nullable|string|max:50',
            'variants.*.compliance_notes'     => 'nullable|string',
            'variants.*.ingredients'          => 'nullable|array',
            'variants.*.ingredients.*'        => 'nullable|string|max:255',
            // nutrition facts
            'variants.*.nutrition.energy_kcal'=> 'nullable|numeric',
            'variants.*.nutrition.protein_g'  => 'nullable|numeric',
            'variants.*.nutrition.fat_g'      => 'nullable|numeric',
            'variants.*.nutrition.carbs_g'    => 'nullable|numeric',
            'variants.*.nutrition.sugar_g'    => 'nullable|numeric',
            'variants.*.nutrition.sodium_mg'  => 'nullable|numeric',
        ]);

        $data['slug']        = $data['slug'] ?: Str::slug($data['name']);
        $data['is_active']   = $request->boolean('is_active', true);
        $data['advantages']  = array_filter($request->input('advantages', []));

        $product = Product::create($data);

        // Images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $file) {
                $path = $file->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'alt_text'   => $product->name,
                    'order'      => $idx,
                ]);
            }
        }

        // Variants + nutrition facts
        foreach ($request->input('variants', []) as $varData) {
            if (empty($varData['variant_name'])) continue;
            $variant = $product->variants()->create([
                'variant_name'     => $varData['variant_name'],
                'ingredients'      => array_filter($varData['ingredients'] ?? []),
                'net_weight'       => $varData['net_weight'] ?? null,
                'compliance_notes' => $varData['compliance_notes'] ?? null,
            ]);

            $nutrition = $varData['nutrition'] ?? [];
            if (array_filter($nutrition)) {
                $variant->nutritionFact()->create($nutrition);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dibuat.');
    }

    public function edit(Product $product)
    {
        $product->load('images', 'variants.nutritionFact');
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:products,slug,' . $product->id,
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'advantages'  => 'nullable|array',
            'advantages.*'=> 'nullable|string|max:255',
            'is_active'   => 'boolean',
            'images'      => 'nullable|array',
            'images.*'    => 'nullable|image|max:2048',
            'delete_images'   => 'nullable|array',
            'delete_images.*' => 'nullable|integer',
            'variants'                        => 'nullable|array',
            'variants.*.id'                   => 'nullable|integer',
            'variants.*.variant_name'         => 'required_with:variants|string|max:255',
            'variants.*.net_weight'           => 'nullable|string|max:50',
            'variants.*.compliance_notes'     => 'nullable|string',
            'variants.*.ingredients'          => 'nullable|array',
            'variants.*.ingredients.*'        => 'nullable|string|max:255',
            'variants.*.nutrition.energy_kcal'=> 'nullable|numeric',
            'variants.*.nutrition.protein_g'  => 'nullable|numeric',
            'variants.*.nutrition.fat_g'      => 'nullable|numeric',
            'variants.*.nutrition.carbs_g'    => 'nullable|numeric',
            'variants.*.nutrition.sugar_g'    => 'nullable|numeric',
            'variants.*.nutrition.sodium_mg'  => 'nullable|numeric',
        ]);

        $data['slug']       = $data['slug'] ?: Str::slug($data['name']);
        $data['is_active']  = $request->boolean('is_active', true);
        $data['advantages'] = array_filter($request->input('advantages', []));

        $product->update($data);

        // Delete selected images
        foreach ($request->input('delete_images', []) as $imgId) {
            $img = ProductImage::find($imgId);
            if ($img && $img->product_id === $product->id) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        // New images
        if ($request->hasFile('images')) {
            $maxOrder = $product->images()->max('order') ?? -1;
            foreach ($request->file('images') as $idx => $file) {
                $path = $file->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'alt_text'   => $product->name,
                    'order'      => $maxOrder + $idx + 1,
                ]);
            }
        }

        // Sync variants
        $submittedVariantIds = [];
        foreach ($request->input('variants', []) as $varData) {
            if (empty($varData['variant_name'])) continue;

            $variantData = [
                'variant_name'     => $varData['variant_name'],
                'ingredients'      => array_filter($varData['ingredients'] ?? []),
                'net_weight'       => $varData['net_weight'] ?? null,
                'compliance_notes' => $varData['compliance_notes'] ?? null,
            ];

            if (!empty($varData['id'])) {
                $variant = ProductVariant::find($varData['id']);
                if ($variant && $variant->product_id === $product->id) {
                    $variant->update($variantData);
                    $submittedVariantIds[] = $variant->id;
                }
            } else {
                $variant = $product->variants()->create($variantData);
                $submittedVariantIds[] = $variant->id;
            }

            $nutrition = $varData['nutrition'] ?? [];
            if (array_filter($nutrition)) {
                $variant->nutritionFact()->updateOrCreate(
                    ['product_variant_id' => $variant->id],
                    $nutrition
                );
            }
        }

        // Remove variants not in the submission
        $product->variants()->whereNotIn('id', $submittedVariantIds)->each(function ($v) {
            $v->nutritionFact()->delete();
            $v->delete();
        });

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus.');
    }
}
