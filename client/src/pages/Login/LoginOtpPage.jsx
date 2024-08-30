import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyUser } from '../../services/Apis'
import {sendOTP} from '../../services/Apis'
import { Button } from '@material-tailwind/react'

const LoginOtpPage = () => {
    const [otp, setOTP] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(60); // 1 minutes in seconds
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if(loading) return;
        setLoading(true);
        if (otp === "") {
            toast.error("Please enter your OTP");
        }
        else if (!/[^a-zA-Z]/.test(otp)) {
            toast.error("Enter a valid OTP");
        }
        else if (otp.length < 6) {
            toast.error("OTP must be of 6 digit");
        }
        else {
            const data = {
                email: location.state,
                otp: otp,
                submitTime: Date.now()
            }

            const response = await verifyUser(data);
            console.log(response);

            if (response.status === 200) {
                const userInfo = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                    department: response.data.department,
                    signatureFile: response.data.signatureFile,
                    userToken: response.data.userToken,
                }
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                toast.success(response.data.message);
                setTimeout(function () {
                    navigate('/dashboard');
                }, 2000);
            }
            else {
                toast.error(response.response.data.err);
            }
        }
        setLoading(false);
    }

    const handleResend = async (e) => {
        e.preventDefault();
        if(resendLoading) return;
        setResendLoading(true);
        const data = {
            email:location.state
        };
        try {
            
          const response = await sendOTP(data); // Assuming resendOTP takes the email as a parameter
          if (response.status === 200) {
            toast.success(response.data.message);
            setTimeRemaining(60); // Reset the timer
          } else {
            toast.error(response.response.data.error);
          }
        } catch (error) {
          console.error("Error resending OTP:", error);
        }

        setResendLoading(false);
      };

    return (
        <div className='bg-gray-100 flex items-center justify-center h-screen'>
            <div className="bg-white p-8 rounded shadow-md" style={{width:"300px", height:"300px"}}>
                <h1 className="text-4xl font-semibold font-header mb-8 mt-2">VERIFY YOUR OTP</h1>
                {/* Display OTP expiry message or countdown */}
                {timeRemaining > 0 ? (
                    <p className="text-white text-xl bg-red-300 p-1 w-48 rounded-sm mb-4">
                        Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </p>
                ) : (
                    <p className="text-red-600 text-xl mb-4">OTP has expired. Please request a new one.</p>
                )}
                <form method="POST">
                    <div>
                        <div class="mb-4">
                            <input onChange={(e) => { setOTP(e.target.value) }} type="text" id="otp" name="otp" placeholder='Enter your OTP here...' className="mt-1 p-2 w-full border focus:outline-none rounded-md" />
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Button onClick={handleSubmit} loading={loading} type="submit" size='lg' variant='gradient' color='blue' className='text-lg font-figtree'>
                            Submit
                        </Button>
                        <Button onClick={handleResend} loading={resendLoading} size='lg' variant='gradient' color='green' className='text-lg font-figtree'>
                            Resend OTP
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginOtpPage