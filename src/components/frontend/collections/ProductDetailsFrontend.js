import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
 



const ProductDetailsFrontend = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    // const productCount = product.length;
    
    let {category} = useParams();
    console.log(category);
    let {product} = useParams();
    console.log(product);
    
    // const category_slug = params.category;
    // const product_slug = params.product;

    useEffect(() => {
        
        let isMounted = true;

        // const product_slug = slug;
        axios.get(`/api/view-product/${category}/${product}`).then((res)=>{
            if(isMounted){
                if(res.data.status===200){
                    setProducts(res.data.product); 
                    console.log(res.data.product.qty)
                    setLoading(false);
                }else if(res.data.status === 400)
                {
 
                    swal("Warning",res.data.message,"");
                }
                else if(res.data.status === 404)
                {
                    navigate('/collection');
                    swal("Warning",res.data.message,"error");
                }
            }
        })

        return ()=>{
            isMounted =false;
        }
 

    }, [navigate,useParams])

     // Quantity Increment/Decrement in Hooks - Start
     const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }
    }
    // Quantity Increment/Decrement in Hooks - End

    const submitAddtocart = (e) => {
        e.preventDefault();
        
        const data = {
            product_id: products.id,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res=>{
            if(res.data.status === 201){
                //Created - Data Inserted
                swal("Success",res.data.message,"success");
                
            }else if(res.data.status === 409){
                //Already added to cart
                swal("Success",res.data.message,"success");
            }else if(res.data.status === 401){
                //Unauthenticated
                swal("Error",res.data.message,"error");
            }else if(res.data.status === 404){
                //Not Found
                swal("Warning",res.data.message,"warning");
            }
        });

    }


    if(loading){
        return <h4>Loading Product Details</h4>
    }else  
    {

        var avail_stock = '';
        if(products.qty > 0)
        {
            avail_stock = <div>
                <label className="btn-sm btn-success px-4 mt-2">In stock</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement}  className="input-group-text">+</button>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={submitAddtocart}  >Add to Cart</button>
                    </div>
                </div>
            </div>
        }
        else
        {
            avail_stock = <div>
                <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
            </div>
        }
    }

  return (
    <div>
    <div className="py-3 bg-warning">
        <div className="container">
            <h6>Collections / {products.category.name} / {products.name}</h6>
        </div>
    </div>

    <div className="py-3">
        <div className="container">
            <div className="row">

                <div className="col-md-4 border-end">
                    <img src={`http://localhost:8000/${products.image}`} alt={products.name} className="w-100" />
                </div>

                <div className="col-md-8">
                    <h4>
                        {products.name}
                        <span className="float-end badge btn-sm btn-danger badge-pil"> {products.brand} </span>
                    </h4>
                    <p> {products.description} </p>
                    <h4 className="mb-1"> 
                        Rs: {products.selling_price}
                        <s className="ms-2">  Rs: {products.original_price} </s>
                    </h4>
                    <div>
                        {avail_stock}
                    </div>

                    <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button>
                   
               </div>

            </div>
        </div>
    </div>
</div>
  )
}

export default ProductDetailsFrontend