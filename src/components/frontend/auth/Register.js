import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'

const Register = () => {
    const [registerInput, setRegister] = useState({
        name :'',
        email : '',
        password : ''
    })

    const handleInput = (e)=>{
        e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value});
    }

    const registerSubmit = (e)=>{
        e.preventDefault();
 
        const data = {
            name : registerInput.name,
            email : registerInput.email,
            password : registerInput.password
        }

        axios.post('http://localhost:8000/api/register',data).then((response)=>{
              
        })
    }
  return (
    <div>
    <Navbar/>
    <div className='container py-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                    <h4>Register</h4>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={registerSubmit}>
                            <div className='form-group-mb-3'>
                                <label>Full Name</label>
                                <input type="text" name="name" onChange={handleInput}    className='form-control' value={registerInput.name}/>
                            </div>
                            <div className='form-group-mb-3'>
                                <label>Email ID</label>
                                <input type="text" name="email" onChange={handleInput}  className='form-control' value={registerInput.email}/>
                            </div>
                            <div className='form-group-mb-3'>
                                <label>Password</label>
                                <input type="text" name="password" onChange={handleInput}  className='form-control' value={registerInput.password}/>
                            </div>
                            
                            <div className='form-group-mb-3'>
                            <button  type='submit' className='btn btn-primary'  >Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

  )
}

export default Register