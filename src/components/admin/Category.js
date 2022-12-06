import axios from 'axios';
import React, { useState } from 'react'

const Category = () => {

    const [categoryInput, setCategory] = useState({
        slug : '',
        name : '',
        description : '',
        status : '',
        meta_title : '',
        meta_name : '',
        meta_description : ''
    })

    const handleInput = (e)=>{
        e.persist();

        setCategory({...categoryInput,[e.target.name]:e.target.value})

    }


    const submitCategory = (e)=>{
        e.persist();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description  
        }

        axios.post('/api/store-category',data).then((res)=>{

            if(res.data.status === 200){

                
            }else{


            }

        })
    }
    
  return (
    <div className='container-fluid px-4'>
            <h2 className='mt-4'> 
                 Add Category
            </h2>
            <form onSubmit={submitCategory}>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                    </li> 
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active p-3" id="home" role="tabpanel" aria-labelledby="home-tab" >
                <div className='form-group mb-3  '>
                    <label>Slug</label>
                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control"/>
                </div>
                <div className='form-group mb-3 '>
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name}  className="form-control"/>
                </div>
                <div className='form-group mb-3'>
                    <label>Description</label>
                    <textarea   name="description" onChange={handleInput} value={categoryInput.description}  className="form-control"></textarea>
                </div>
                <div className='form-group mb-3'>
                    <label>Status</label>
                    <input type="checkbox" name="status"   onChange={handleInput} value={categoryInput.status}    /> 
                    
                    {/* //Status 0=shown , 1= hidden */}
                </div>
            </div>
            <div className="tab-pane card-body border fade  p-3"  id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab"  >
                <div className='form-group mb-3'>
                    <label>Meta Title</label>
                    <input type="text" name="meta_title" className='form-control'   onChange={handleInput} value={categoryInput.meta_title}  /> 
                </div>
                <div className='form-group mb-3'>
                    <label>Meta Keywords</label>
                    <input type="text" name="meta_keyword" className='form-control'    onChange={handleInput} value={categoryInput.meta_name} /> 
                </div>
                <div className='form-group mb-3'>
                    <label>Meta Description</label>
                    <textarea   name="meta_description" className="form-control"  onChange={handleInput} value={categoryInput.meta_description}></textarea>
                </div>
            </div>
           
            </div>
            <div type="submit" className='btn btn-primary px-4 float-end'>Submit</div>
            </form>
    </div>
  )
}

export default Category