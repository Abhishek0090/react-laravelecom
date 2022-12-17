import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Navigate, useParams } from 'react-router-dom';




const ProductDetailsFrontend = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const productCount = product.length;
    
    let {category} = useParams();
    let {product} = useParams();
    
    // const category_slug = params.category;
    // const product_slug = params.product;

    useEffect(() => {
        
        let isMounted = true;

        // const product_slug = slug;
        axios.get(`/api/view-product/${category}/${product}`).then((res)=>{
            if(isMounted){
                if(res.data.status===200){
                    setProducts(res.data.product); 
                    setLoading(false);
                }else if(res.data.status === 400)
                {
 
                    swal("Warning",res.data.message,"");
                }
                else if(res.data.status === 404)
                {
                    Navigate('/collection');
                    swal("Warning",res.data.message,"error");
                }
            }
        })

        return ()=>{
            isMounted =false;
        }
 

    }, [Navigate,useParams])

    if(loading){
        return <h4>Loading Product Details</h4>
    }else{

    }

  return (
    <div>
        <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Collections / category / product</h6>
                </div>
        </div>


        <div className='py-3  '>
                <div className='container'>
                     <div className="row">

                        <div className="col-md-4 border-end">
                            {/* <img src={`http://localhost:8000/${product.image}`} alt={product.name} className="w-100" /> */}
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {/* {product.name} */}
                                <span className="float-end badge btn-sm btn-danger badge-pil"> {product.brand} </span>
                            </h4>
                            {/* <p> {product.description} </p> */}
                            <h4 className="mb-1"> 
                                {/* Rs: {product.selling_price} */}
                                {/* <s className="ms-2">  Rs: {product.original_price} </s> */}
                            </h4>
                            <div>
                                {/* {avail_stock} */}
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