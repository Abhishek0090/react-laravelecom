<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;

 

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

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
});

Route::middleware(['auth:sanctum' ])->group(function(){ 

    Route::post('logout',[AuthController::class,'logout']);
});

