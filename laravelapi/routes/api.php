<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;

 

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
 //Adding category
 Route::post('view-category',[CategoryController::class,'view']);
});

Route::middleware(['auth:sanctum' ])->group(function(){ 

    Route::post('logout',[AuthController::class,'logout']);
});

