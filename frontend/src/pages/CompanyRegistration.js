import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function CompanyRegistration() {

    const [registrationInfo, setRegistrationInfo] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        companyPhone: '',
        EngPhone: '',
        commercialRegister: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyRegistrationInfo = { ...registrationInfo };
        copyRegistrationInfo[name] = value;
        setRegistrationInfo(copyRegistrationInfo);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        const { name, email, username, password, confirmPassword, companyPhone, commercialRegister } = registrationInfo;
        if (!name || !email || !username || !password || !confirmPassword || !companyPhone || !commercialRegister) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/company/registration`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/company-login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='container registration'>
            <h1>Company Registration</h1>
            <form onSubmit={handleRegistration}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={registrationInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={registrationInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        onChange={handleChange}
                        type='username'
                        name='username'
                        placeholder='Enter your username...'
                        value={registrationInfo.username}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={registrationInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='confirmPassword'
                        placeholder='Enter your Confirm Password...'
                        value={registrationInfo.confirmPassword}
                    />
                </div>
                <div>
                    <label htmlFor='companyPhone'>Company Phone</label>
                    <input
                        onChange={handleChange}
                        type='tel'
                        name='companyPhone'
                        placeholder='Enter your Company Phone...'
                        value={registrationInfo.companyPhone}
                    />
                </div>
                <div>
                    <label htmlFor='EngPhone'>Eng Phone</label>
                    <input
                        onChange={handleChange}
                        type='tel'
                        name='EngPhone'
                        placeholder='Enter your Eng Phone...'
                        value={registrationInfo.EngPhone}
                    />
                </div>
                <div>
                    <label htmlFor='commercialRegister'>Commercial Register</label>
                    <input
                        className='commercialRegister'
                        onChange={handleChange}
                        type='file'
                        name='commercialRegister'
                        accept=".pdf"
                        value={registrationInfo.commercialRegister}
                    />
                </div>

                <button type='submit'>Registration</button>
                <span>Already have an account ?
                    <Link to="/company-login"> Login</Link>
                </span>
                <span>If you are a supplier?
                    <Link to="/supplier-registration"> Supplier</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CompanyRegistration;
