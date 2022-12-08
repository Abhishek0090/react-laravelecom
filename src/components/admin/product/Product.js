import axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Product = () => {

  const [input, setinput] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [productInput, setProduct] = useState({
    slug: '',
    name: '',
    description: '',
    status: '',
    meta_title: '',
    meta_name: '',
    meta_description: '',
    error_list: []
  })
const handleImage = ()=>{
  
}
  const handleInput = (e) => {
    e.persist();

    setProduct({ ...productInput, [e.target.name]: e.target.value })

  }

  useEffect(() => {
     
  axios.get('/api/all-category').then((res)=>{
    if(res.data.status===200){
      setCategoryList(res.data.category);
    }
  })

  }, [input])
  

  const submitCategory = (e) => {
    e.preventDefault();

    const data = {
      slug: productInput.slug,
      name: productInput.name,
      description: productInput.description,
      status: productInput.status,
      meta_title: productInput.meta_title,
      meta_keyword: productInput.meta_keyword,
      meta_description: productInput.meta_description
    }

    axios.post('/api/add-product', data).then((res) => {

      if (res.data.status === 200) {

        // e.target.reset();
        swal("Success", res.data.message, "success");
        
      } else if (res.data.status === 400) {

        setProduct({ ...productInput, error_list: res.data.errors });
      }

    })
  }

  var display_errors = [];
  if (productInput.error_list) {
    display_errors = [
      productInput.error_list.slug,
      productInput.error_list.name,
      productInput.error_list.meta_title
    ]
  }

  return (
    <div className='container-fluid px-4'>
      {
        display_errors.map((item) => {
          return (<p className='mb-1' key={item}>{item}</p>)
        })
      }
      <div className="card-header">
        <h4>Add Product
          <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
        </h4>
      </div>

      <div className="card-body">

        <form  encType="multipart/form-data" onSubmit={submitCategory}  >

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active p-3" id="home" role="tabpanel" aria-labelledby="home-tab" >
              <div className='form-group mb-3'>
                <label>Select Category</label>
                <select name="category_id" className='form-control'>
                  <option>Select Category</option>
                  {
                    categoryList.map((item)=>{
                      return (
                        <option value={item.id} key={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className='form-group mb-3  '>
                <label>Slug</label>
                <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
              </div>
              <div className='form-group mb-3 '>
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
              </div>
              <div className='form-group mb-3'>
                <label>Description</label>
                <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
              </div>
            </div>

            <div className="tab-pane card-body border fade  p-3" id="seotags" role="tabpanel" aria-labelledby="seo-tags-tab"  >

              <div className='form-group mb-3'>
                <label>Meta Title</label>
                <input type="text" name="meta_title" className='form-control' onChange={handleInput} value={productInput.meta_title} />
              </div>

              <div className='form-group mb-3'>
                <label>Meta Keywords</label>
                <input type="text" name="meta_keyword" className='form-control' onChange={handleInput} value={productInput.meta_keyword} />
              </div>

              <div className='form-group mb-3'>
                <label>Meta Description</label>
                <textarea name="meta_description" className="form-control" onChange={handleInput} value={productInput.meta_description}></textarea>
              </div>
            </div>

            <div className="tab-pane card-body border fade  p-3" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab"  >

              <div className="row">

                <div className="col-md-4 form-group mb-3">
                  <label>Selling Price</label>
                  <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                  {/* <small className="text-danger">{error_list.selling_price}</small> */}
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Original Price</label>
                  <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                  {/* <small className="text-danger">{error_list.original_price}</small> */}
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Quantity</label>
                  <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                  {/* <small className="text-danger">{error_list.qty}</small> */}
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Brand</label>
                  <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                  {/* <small className="text-danger">{error_list.brand}</small> */}
                </div>
                <div className="col-md-8 form-group mb-3">
                  <label>Image</label>
                  <input type="file" name="image" onChange={handleImage} className="form-control" />
                  {/* <small className="text-danger">{error_list.image}</small> */}
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Featured (checked=shown)</label>
                  <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className="w-50 h-50" />
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Popular (checked=shown)</label>
                  <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className="w-50 h-50" />
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Status (checked=Hidden)</label>
                  <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className="w-50 h-50" />
                </div>

              </div>


            </div>
              <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Product