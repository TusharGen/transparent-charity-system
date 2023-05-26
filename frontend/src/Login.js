import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Validation from './LoginValidation';
//resume from 22 minutes
function Login() {
    const [values, setValues] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [errors,setErrors]=useState({})
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values))
    }
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign In</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" onChange={handleInput} placeholder='Enter Email' name='email' className='form-control rounded-0'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" onChange={handleInput} placeholder='Enter Password' name='password' className='form-control rounded-0'></input>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>You agree to out terms and policies.</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login