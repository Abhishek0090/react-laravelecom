import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const ViewProductFrontend = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);

    
    
    let productCount = product.length;

    console.log(productCount)
    let {slug} = useParams();
    
    useEffect(() => {
        
        let isMounted = true;

 
        axios.get(`/api/fetchproducts/${slug}`).then((res)=>{
            if(isMounted){
                if(res.data.status===200){
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
          

                    setLoading(false);
                }else if(res.data.status === 400)
                {
 
                    swal("Warning",res.data.message,"");
                }
                else if(res.data.status === 404)
                {
                    navigate('/collection');
                    swal("Warning",res.data.message,"error")    ;
                }
            }
        })

        return ()=>{
            isMounted =false;
        };
 

    }, [navigate,useParams])
    
    if(loading)
    {
        return <h4>Loading Products...</h4>
    }else {
        var showProductList = '';
        if(productCount)
        { 
            showProductList = product.map( (item, idx) => {
                return (
                    
                    <div className="col-md-3" key={idx}>
 
                        <div className="card">
                            <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name} />
                            </Link>
                            <div className="card-body">
                                <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                    <h5>{ item.name }</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
            );
        }else
        {
            showProductList = 
            <div className="col-md-12">
                <h4>No Product Available for {category.name}</h4>
            </div>
        }
    }
  return (
    <div>
    <div className="py-3 bg-warning">
       <div className="container">
        <h6>Collections / {category.name}</h6>
       </div>
    </div>

    <div className="py-3">
       <div className="container">
           <div className="row">
               {showProductList}
           </div>
       </div>
    </div>
</div>
  )
}

export default ViewProductFrontend