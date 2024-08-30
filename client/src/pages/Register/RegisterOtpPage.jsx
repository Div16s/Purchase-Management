import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/Apis'
import { sendOTP_register } from '../../services/Apis'
import { Button } from '@material-tailwind/react'
import { Container, Input, Stack, Text } from '@chakra-ui/react'

const RegisterOtpPage = () => {
    const [otp, setOTP] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(60); // 1 minutes in seconds
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const userDetails = {
        name: location.state.name,
        email: location.state.email,
        role: location.state.role,
        department: location.state.department
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
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
                name: userDetails.name,
                email: userDetails.email,
                otp: otp,
                role: userDetails.role,
                department: userDetails.department,
                submitTime: Date.now()
            }

            const response = await registerUser(data);
            console.log(response);

            if (response.status === 200) {
                const userInfo = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                    department: response.data.department,
                    userToken: response.data.userToken,
                }
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                toast.success(response.data.message);
                //login(userInfo);
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
        setResendLoading(true);
        try {

            const response = await sendOTP_register(userDetails); // Assuming resendOTP takes the email as a parameter
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeRemaining(60); // Reset the timer
            } else {
                toast.error(response.response.data.err);
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
        }

        setResendLoading(false);
    };

    return (
        <div className='bg-gray-100 flex items-center justify-center h-screen'>
            <Container className="bg-white p-8 rounded shadow-md" w={400} h={300} gap={4}>
                <h1 className="text-4xl font-semibold mb-8">ENTER YOUR OTP</h1>
                {/* Display OTP expiry message or countdown */}
                {timeRemaining > 0 ? (
                    <Text className="text-gray-600 mb-4" fontSize={"medium"} bg={"red.400"} color={"white"} px={2} py={1}>
                        Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </Text>
                ) : (
                    <Text className="text-red-600 mb-4" fontSize={"medium"}>OTP has expired. Please request a new one.</Text>
                )}
                <form method="POST">
                    <div>
                        <div class="mb-8">
                            <Input onChange={(e) => { setOTP(e.target.value) }} type="text" id="otp" name="otp" placeholder='Enter your OTP here...' className="mt-1 p-2 w-full border rounded-md" h={14} fontSize={"initial"}/>
                        </div>
                    </div>
                    <Stack gap={2}>
                        <Button onClick={handleSubmit} loading={loading} type="submit" size='lg' variant='gradient' color='blue' className='text-xl font-figtree'>
                            Submit
                        </Button>
                        <Button onClick={handleResend} loading={resendLoading} size='lg' variant='gradient' color='green' className='text-xl font-figtree'>
                            Resend OTP
                        </Button>
                    </Stack>
                </form>
            </Container>
            <ToastContainer />
        </div>
    )
}

export default RegisterOtpPage