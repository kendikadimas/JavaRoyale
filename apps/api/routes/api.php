<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\BuyerCategoryController;
use App\Http\Controllers\Api\FaqItemController;
use App\Http\Controllers\Api\HomepageSettingController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SeoSettingController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\SocialEmbedSettingController;
use Illuminate\Support\Facades\Route;

Route::get('/site-setting', [SiteSettingController::class, 'show']);
Route::get('/homepage-setting', [HomepageSettingController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::get('/faq-items', [FaqItemController::class, 'index']);
Route::get('/buyer-categories', [BuyerCategoryController::class, 'index']);
Route::get('/seo-settings/{pageKey}', [SeoSettingController::class, 'show']);
Route::post('/inquiries', [InquiryController::class, 'store']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/social-embed-settings', [SocialEmbedSettingController::class, 'index']);
