import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar'

const ViewCategoryFrontend = () => {

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {


        axios.get(`/api/getCategory`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.category);
                setCategory(res.data.category);
            }
            setLoading(false);

        });

    }, []);


    if (loading) {
        return <h4>Loading Categories...</h4>
    }
    else {
        var showCategoryList = '';
        showCategoryList = category.map((item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <Link to={`collection/${item.slug}`}>
                            <img src="" className="w-100" alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`collection/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }
    if (showCategoryList.length > 0) {
        return (
            <div>
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Category Page</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            {showCategoryList}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    else {
        return (
            <div>
                <Navbar />
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h6>Category Page</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <h4>No Collections</h4>
                    </div>
                </div>

            </div>
        )
    }
}

export default ViewCategoryFrontend