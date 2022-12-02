<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request){
            $validator = Validator::make($request->all(),[
                'name'=>'required',
                'email'=>'required |email | make:191 |unique:users',
                'password'=>'required | min:8'
            ]);      

            if($validator->fails()){
                return response()->json([
                    'validation_errors' => $validator->messages()
                ]);    
            }else{
                $user = User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password'=>$request->password
                ]);    
            }

    }
}
