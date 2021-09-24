import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from './Input';
import { validateEmail, isLength } from './Validation';
import { authForm } from '../../actions/auth'

const intialState = { name: '', email: '', password: '', confirmPassword: '' }

const AuthForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(intialState);
    const [error, setError] = useState('');

    const handleError = (formData) => {
        const activeError = document.querySelector('.error');

        const { email, password, confirmPassword } = formData;

        if (password !== confirmPassword && isSignUp) {
            setError("Password did not match.");
            console.log(password, confirmPassword);
            activeError.style.display = 'block';
        } else if (isLength(password)) {
            setError("Password must be at least 8 characters.");
            activeError.style.display = 'block';
        } else {
            setError(JSON.parse(localStorage.getItem("error")));
            setFormData({ ...formData, password: password });
            activeError.style.display = 'none';
        }

        if(!validateEmail(email)) {
            setError("Invalid email ");
            activeError.style.display = 'block';
        }
        
        const authError = JSON.parse(localStorage.getItem('error'));

        const authErrorMessage =  authError?.message;

        if (authError?.errors?.email[0] || authError?.errors?.password[0] || authError?.errors?.name[0]) {
            setError(authError?.errors?.email[0] || authError?.errors?.password[0] || authError?.errors?.name[0]);
            activeError.style.display = 'block';
        } else if (authErrorMessage) {
            setError(authErrorMessage);
            activeError.style.display = 'block';
        } else {
            setError('');
            activeError.style.display = 'none';
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleError(formData);

        const { name, email, password } = formData;
        const user = { name, email, password };

        if (isSignUp) {
            dispatch(authForm(user, history, 'signup'))
        }else {
            dispatch(authForm({ email, password}, history, 'signin'))
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowPassword = () => setShowPassword((currentShowPassword) => !currentShowPassword);

    const signUpOrIn = isSignUp ? 'signUpContainer' : 'signInContainer';

    const toggleActiveLogin = () =>{
        const authContainer = document.querySelector('.authContainer');
        authContainer.classList.toggle('right-panel-active');
        setIsSignUp(currentSignUp => !currentSignUp);
    }

    return (
        <div className="mainContainer">
            <div className="authContainer">
                <div className={`formContainer ${signUpOrIn}`}>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="error" title="Error"><h4>{error}</h4></div>
                        {
                        isSignUp ? (
                            <>
                                <h1>Create Account</h1>
                                <Input className="input" name='name' label="Name" handleChange={handleChange} autoFocus />
                            </>
                        ): (
                            <h1>Sign in</h1>
                        )}
                        <Input className="input" name='email' label="Email" handleChange={handleChange} type="email" autoFocus={!isSignUp} />
                        <Input className="input" name="password" handleChange={handleChange} label="Password"  type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />
                        { isSignUp && (<Input className="confirmPassword input" name='confirmPassword' label="Repeat Password" handleChange={handleChange} type={ showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword} />)}
                        <button type="submit" className="authButton" title="Submit button" >
                            { isSignUp ? " Sign Up" : "Sign In"}
                        </button>
                    </form>
                </div>
                <div className="overlayContainer">
                    <div className="overlay">
                        { isSignUp ? (
                            <div class="overlayPanel overlayLeft">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button class="ghost authButton" onClick={toggleActiveLogin} title="Sign In Button">Sign In</button>
                            </div>
                        ) : (
                            <div class="overlayPanel overlayRight">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button class="ghost authButton" onClick={toggleActiveLogin} title="Sign Up Button" >Sign Up</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
