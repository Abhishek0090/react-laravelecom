import axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditCategory = () => {

    const [categoryInput, setCategory] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const { id } = useParams();  

    const handleInput = (e) => {
        e.persist();

        setCategory({ ...categoryInput, [e.target.name]: e.target.value })

    }

    
    useEffect(() => {
        
        const category_id =  id;
        
        axios.get(`/api/edit-category/${category_id}`).then((res)=>{
            if(res.data.status === 200){
                setCategory(res.data.category);
            }else if(res.data.status===404){
                 swal("Error",res.data.message,"warning");
                 Navigate('/admin/view-category');
            }
            setLoading(false);
        })
         

    }, [useParams,Navigate])
    
    
    if(loading)
    {
        return <h4>Loading Edit Category...</h4>
    }


    const updateCategory = (e) => {
        e.preventDefault();

        const data = categoryInput; 
        const category_id = id;

        axios.put(`/api/update-category/${category_id}`, data).then((res) => {

            if (res.data.status === 200) {

                // e.target.reset();
                swal("Success", res.data.message, "success");
                setError([]);
                // document.getElementById('CATEGORY_FORM').reset();
            } else if (res.data.status === 422) {

                swal("All fields are mandetory","","error");
                setError( res.data.errors);  

            }  else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                Navigate('/admin/view-category')          
              }

        })
    }

    var display_errors = [];
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title
        ]
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category 
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form  onSubmit={updateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <small className="text-danger">{error.slug}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <small className="text-danger">{error.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} /> Status 0=shown/1=hidden
                                </div>

                            </div>
                            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                                    <small className="text-danger">{error.meta_title}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                                </div>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditCategory