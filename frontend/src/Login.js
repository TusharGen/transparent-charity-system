import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios'
//resume from 22 minutes
function Login() {
    const [values, setValues] = useState(
        {
            email: '',
            password: ''
        }
    )
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values))
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/home');
                    }
                    else {
                        alert("Wrong email or password")
                    }
                })
                .catch(err => console.log(err));
        }
    }
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#13131A' }}>
            <div className='p-3 rounded w-25' style={{ backgroundColor: '#1C1C24' }}>
            <h2 style={{ color: '#4ACD8D' }}>Sign In</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label style={{ color: 'white' }}htmlFor="email">Email</label>
                        <input type="email" style={{ backgroundColor: '#13131A' }} onChange={handleInput} placeholder='Enter Email' name='email' className='form-control rounded-0'></input>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label style={{ color: 'white' }} htmlFor="password">Password</label>
                        <input type="password" style={{ backgroundColor: '#13131A' }} onChange={handleInput} placeholder='Enter Password' name='password' className='form-control rounded-0'></input>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0 rounded-pill' style={{ backgroundColor: '#4ACD8D' }} >Log in</button>
                    <p style={{ color: 'white' }}>You agree to out terms and policies.</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none rounded-pill' >Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login