import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios';
function Signup() {
    const [values, setValues] = useState(
        {
            email: '',
            password: '',
            name: '',
            category: ['beneficiary']
        }
    )
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values))
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    console.log(res.data);
                    if (res.data === 'Duplicate') {
                        //error notification
                        alert("Email already registerd");
                    }
                    else if (res.data === "Error") {
                        alert("Internal Server Error");
                    }
                    else {
                        navigate('/login');
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
            <div className=' p-3 rounded w-25' style={{ backgroundColor: '#1C1C24' }}>
                <h2 style={{ color: '#4ACD8D' }}>Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label style={{ color: 'white' }} htmlFor="name">Name</label>
                        <input style={{ backgroundColor: '#13131A', color: 'white' }} type="text" placeholder='Enter Name' name='name' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label style={{ color: 'white' }} htmlFor="email">Email</label>
                        <input style={{ backgroundColor: '#13131A', color: 'white' }} type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label style={{ color: 'white' }} htmlFor="password">Password</label>
                        <input style={{ backgroundColor: '#13131A', color: 'white' }} type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0'></input>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label style={{ color: 'white' }} htmlFor="category">Category of user</label>
                        <select
                            style={{ backgroundColor: '#13131A', color: 'white' }}
                            name='category'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        >
                            <option value='beneficiary'>Beneficiary</option>
                            <option value='donor'>Donor</option>
                            <option value='store'>Store</option>
                            <option value='charity'>Charity Organisation</option>
                        </select>
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0 rounded-pill' style={{ backgroundColor: '#4ACD8D' }}>Sign Up</button>
                    <p style={{ color: 'white' }}>You agree to out terms and policies.</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 rounded-pill'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup