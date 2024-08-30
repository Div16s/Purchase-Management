import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { sendOTP } from '../../services/Apis';
import { Button } from '@material-tailwind/react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            //If the user is already logged in, redirect to the dashboard
            navigate('/dashboard');
        }
    }, []); // Empty dependency array ensures that this effect runs only once, on component mount

    async function handleLogin(e) {
        e.preventDefault();
        
        if(loading) return;
        setLoading(true);

        //email validation
        if (email === "") {
            toast.error("Enter your email!");
        }
        else if (!email.includes("@")) {
            toast.error("Enter valid email!");
        }
        else {
            const data = {
                email: email
            };
            const response = await sendOTP(data);
            if (response.status === 200) {
                toast.success(response.data.message);

                setEmail("");

                setTimeout(function () {
                    navigate('/login/user/otp', { state: email });
                }, 2000);
            }
            else {
                toast.error(response.response.data.err);
            }
        }
        setLoading(false);
    }

    return (
        <div className='bg-gray-100 flex items-center justify-center h-screen'>
            <div className="bg-white p-8 rounded shadow-md" style={{ width: "300px", height: "300px" }}>
                <h1 className="text-4xl font-header font-semibold mb-2" >Welcome back,</h1>
                <h1 className="text-4xl font-header font-semibold mb-2">Login to continue!</h1>
                <form method="POST">
                    <div className="mb-4 -ml-2">
                        <label for="email" className="text-2xl font-semibold mt-6 text-gray-600">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="text" id="email" name="email" placeholder='Enter your email here...' className="mt-1 ml-2 p-2 w-full text-xl border rounded-md focus:outline-none outline outline-1 outline-gray-200" />
                    </div>
                    {/* <button onClick={handleLogin} disabled={isButtonDisabled} type="submit" className="bg-blue-500 mt-4 text-base text-white font-bold p-2 pl-5 pr-5 rounded-md shadow-sm shadow-gray-500 hover:bg-blue-600 focus:outline-none focus:border-blue-300" style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>
                        Log in
                    </button> */}
                    <Button className='mt-6 text-lg font-figtree' type='submit' onClick={handleLogin} loading={loading} variant='gradient' color='blue' size={"lg"}>
                        Login
                    </Button>
                    <div className='mt-8'>
                        <p className='text-red-600 text-lg font-normal'>Don't have an account? <NavLink to={'/signup'} className={"font-bold hover:underline text-blue-300 hover:text-blue-600"}>Register!</NavLink></p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login