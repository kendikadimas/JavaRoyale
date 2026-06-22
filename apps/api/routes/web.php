<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\BuyerCategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqItemController;
use App\Http\Controllers\Admin\HomepageSettingController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SeoSettingController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\SocialEmbedSettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Products
    Route::resource('products', ProductController::class);

    // Articles
    Route::resource('articles', ArticleController::class);

    // Inquiries (no create/store — submitted from frontend)
    Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::get('inquiries/{inquiry}', [InquiryController::class, 'show'])->name('inquiries.show');
    Route::patch('inquiries/{inquiry}', [InquiryController::class, 'update'])->name('inquiries.update');

    // FAQ Items
    Route::resource('faq-items', FaqItemController::class);

    // Buyer Categories
    Route::resource('buyer-categories', BuyerCategoryController::class);

    // Testimonials
    Route::resource('testimonials', TestimonialController::class);

    // Homepage Setting (singleton)
    Route::get('homepage-setting', [HomepageSettingController::class, 'edit'])->name('homepage-setting.edit');
    Route::put('homepage-setting', [HomepageSettingController::class, 'update'])->name('homepage-setting.update');

    // Site Setting (singleton)
    Route::get('site-setting', [SiteSettingController::class, 'edit'])->name('site-setting.edit');
    Route::put('site-setting', [SiteSettingController::class, 'update'])->name('site-setting.update');

    // Social Embed Settings
    Route::resource('social-embed-settings', SocialEmbedSettingController::class);

    // SEO Settings
    Route::resource('seo-settings', SeoSettingController::class);

    // Profile
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
