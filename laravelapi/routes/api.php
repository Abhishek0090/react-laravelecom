<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;

 

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::get('getCategory',[FrontendController::class,'category']);
Route::get('fetchproducts/{slug}',[FrontendController::class,'product']);
Route::get('view-product/{category_slug}/{product_slug}',[FrontendController::class,'viewproduct']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){

    Route::get('/checkingAuthenticated', function () {
         return response()->json(['message'=>'You are','status'=>200],200);
    });

    //Adding category
    Route::post('store-category',[CategoryController::class,'store']);

 
    //viewing category 
    Route::get('view-category',[CategoryController::class,'index']);

    //edit category
    Route::get('edit-category/{id}',[CategoryController::class,'edit']);

    //update category
    Route::put('update-category/{id}',[CategoryController::class,'update']);

    //delete category
    Route::delete('delete-category/{id}',[CategoryController::class,'destroy']);

    //delete category
    Route::get('all-category',[CategoryController::class,'allcategory']);

    //Products
    Route::post('store-product',[ProductController::class,'store']);
    //Products
    Route::get('edit-product/{id}',[ProductController::class,'edit']);
    //Products

    Route::any('update-product/{id}',[ProductController::class,'update']);

    //Products
    Route::get('view-product',[ProductController::class,'index']);
    
   
});

Route::middleware(['auth:sanctum' ])->group(function(){ 

    Route::post('logout',[AuthController::class,'logout']);
});

