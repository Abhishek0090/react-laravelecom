<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'slug',
        'name',
        'description', 
        'small_description', 
        'long_description', 
        'meta_title',
        'meta_keyword',
        'meta_description',
        'image',
        'selling_price',
        'original_price',
        'qty',
        'brand',
        'featured',
        'popular',
        'status',
    ];
}
