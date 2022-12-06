<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request){
        $category = new Category();        
        $category->meta_title = $request->input('meta_title');
        $category->meta_keyword = $request->input('meta_keyword');
        $category->meta_description = $request->input('meta_description');
        $category->slug = $request->input('slug');
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->status = $request->input('status')==true ?'1':'0';
    }
}
