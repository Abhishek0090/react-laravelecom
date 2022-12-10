<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
 /**
     * Provision a new web server.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        // ...
    }
    public function category(){
        $category = Category::where('status','0')->get();
        return response()->json([
          'status'=>200,
          'message'=>'data fetched Successfully',
          'category'=>$category

        ]);
     }
}
