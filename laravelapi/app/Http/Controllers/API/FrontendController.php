<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use App\Models\Product;
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


     public function product($slug){

   
      $category = Category::where('slug',$slug)->where('status','0')->first();

      if($category){

        $product = Product::where('category_id',$category->id)->where('status','0')->get();



        if($product){

            return response()->json([
              'status'=>200,
              'message'=>'Product Fetched Successfully',
              'product_data'=>[
                'product'=>$product,
                'category'=>$category
              ]

            ]);

        }else{

          return response()->json([
            'status'=>400,
            'message'=>'No Product Found'
          ]);
        }
      }else{
        return response()->json([
          'status'=>404,
          'message'=>'No Category Found'
          
        ]);
 
     }
}


      public function viewproduct($category_slug,$product_slug){

       
        $category = Category::where('slug',$category_slug)->where('status','0')->first();

        if($category){
  
          $product = Product::where('category_id',$category->id)->where('slug',$product_slug)->where('status','0')->first();
  
          if($product){
  
              return response()->json([
                'status'=>200,
                'message'=>'Product Fetched Successfully', 
                'product'=>$product 
              ]);
  
          }else{
  
            return response()->json([
              'status'=>400,
              'message'=>'No Product Found'
            ]);
          }
        }else{
          return response()->json([
            'status'=>404,
            'message'=>'No Such Category Found'
            
          ]);
       }


       
       
      }

}
