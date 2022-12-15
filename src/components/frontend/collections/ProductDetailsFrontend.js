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

  return (
    <div>
        <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Collections / category / product</h6>
                </div>
        </div>


        <div className='py-3  '>
                <div className='container'>
                    <h6>  product data</h6>
                </div>
        </div>
 


    </div>
  )
}

export default ProductDetailsFrontend