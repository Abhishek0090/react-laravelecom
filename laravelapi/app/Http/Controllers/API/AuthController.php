<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
 use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    
    //
    public function register(Request $request){
            $validator = Validator::make($request->all(),[
                'name'=>'bail|required',
                'email'=>'required|email|max:191|unique:users,email',
                'password'=>'required|min:8'
            ]);      

            if($validator->fails()){
                return response()->json([
                    'validation_errors' => $validator->errors()
                ]);    
            }else{
                $user = User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password'=>Hash::make($request->password)
                ]);    

                $token = $user->createToken($user->email.'_TOKEN')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'username' => $user->name,
                    'token'=>$token,
                    'message'=>'Registered Successfully'
                ]);
            }

    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|max:191',
            'password' => 'required'
        ]);


        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->errors()
            ]);    
        }else{
            $user = User::where('email', $request->email)->first();
 
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials'
                ]); 
            }else{
                
                $token = $user->createToken($user->email.'_TOKEN')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'username' => $user->name,
                    'token'=>$token,
                    'message'=>'Logged in Successfully'
                ]);
            }
        }
    }


    public function logout(Request $request){
        
        $accessToken = $request->bearerToken();
        
        $token = PersonalAccessToken::findToken($accessToken);


        $token->delete();

        // $request->user()->currentAccessToken()->delete();
        // auth()->user()->tokens()->delete();
        return response().json([
            'status' => 200,
            'message' => 'Logged out Successfully'
        ]);
    }
} 
