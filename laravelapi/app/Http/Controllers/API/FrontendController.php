<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function category(){
        $category = Category::where('status','0')->get();
        return response()->json([
          'status'=>200,
          'message'=>'data fetched Successfully',
          'category'=>$category

        ]);
     }
}
