<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'meta_title'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=> $validator->messages()
            ]);
        }else{

        }

        $category = new Category();        
        $category->meta_title = $request->input('meta_title');
        $category->meta_keyword = $request->input('meta_keyword');
        $category->meta_description = $request->input('meta_description');
        $category->slug = $request->input('slug');
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->status = $request->input('status')==true ?'1':'0';
        $category->save();
        return response()->json([
            'status'=>200,
            'message'=>'Category Added Successfully'
        ]);
    }

    public function view(){

        $category = Category::all();

        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }
}
