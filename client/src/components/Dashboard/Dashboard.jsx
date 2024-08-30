import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify'
import './Dashboard.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Box, Divider, Input, Text, Flex } from '@chakra-ui/react';

function ConvertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    };
  })
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [user, setUser] = useState("");
  const [signatureFile, setSignatureFile] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [editable, setEditable] = useState(false);
  const [jwtToken, setJwtToken] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (name === "") {
      toast.error("Please enter the required fields!");
    }
    else {
      const base64_sigFile = await ConvertToBase64(signatureFile);
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('name', name);
      formData.append('signatureFile', base64_sigFile);

      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      }

      const response = await updateUser(formData, header);

      if (response.status === 200) {
        const userInfo = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          department: response.data.department,
          signatureFile: response.data.signatureFile,
          userToken: response.data.userToken
        }
        toast.success(response.data.message);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(userInfo);
        setEditable(false);
      }
      else {
        toast.error(response.response.data.err);
      }
    }

    setButtonDisabled(false);
  };

  function isUserValid() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo && userInfo.userToken) {
      setUser(userInfo);
      setName(userInfo.name);
      setJwtToken(userInfo.userToken);
    }
    else {
      navigate('/login');
    }
  }

  useEffect(() => {
    isUserValid();
  }, []);

  return (

    <>
      <div className='dashboard-home h-screen'>
        <div className='flex justify-center'>
          <Card className="w-2/5 mt-36">
            <CardHeader
              variant="gradient"
              color='gray'
              className="mb-2 grid h-28 place-items-center"
            >
              <Typography variant="h2" color="white">
                DASHBOARD
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="mb-2">
              <Text fontSize="xxl" fontWeight="medium" mb={1}>
                Name
              </Text>
                {editable ? (
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-black font-normal p-1 rounded-sm border-1 focus:outline-none focus:ring-2 ring-gray-500" h={14} fontSize={"initial"}/>
                ) : (
                  <Box
                  p={2}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="sm"
                  bg="gray.50"
                  fontSize="xxxl"
                >
                  {user.name}
                </Box>
                )}
              </div>

              <div className="mb-2">
              <Text fontSize="xxl" fontWeight="medium" mb={1}>
                Email
              </Text>
              <Box
                  p={2}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="sm"
                  bg="gray.50"
                  fontSize="xxxl"
                >
                  {user.email}
                </Box>
              </div>

              <div className="mb-2">
              <Text fontSize="xxl" fontWeight="medium" mb={1}>
                Role
              </Text>
                <Box
                  p={2}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="sm"
                  bg="gray.50"
                  fontSize="xxxl"
                >
                  {user.role}
                </Box>
              </div>

              <div className="mb-2">
              <Text fontSize="xxl" fontWeight="medium" mb={1}>
                Department
              </Text>
                <Box
                  p={2}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="sm"
                  bg="gray.50"
                  fontSize="xxxl"
                >
                  {user.department}
                </Box>
              </div>

              <div className="mb-2">
              <Text fontSize="xxl" fontWeight="medium" mb={1}>
                Signature
              </Text>
                {editable ? (
                  <Input
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => setSignatureFile(e.target.files[0])}
                  borderColor="gray.300"
                  focusBorderColor="teal.500"
                  p={1}
                />
                ) : ( 
                  user.signatureFile ? (
                  <Box
                    as="img"
                    src={user.signatureFile}
                    alt="Signature"
                    w="30"
                    h="32"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="md"
                  />
                ) : (
                  <Flex
                    justify="center"
                    align="center"
                    border="1px"
                    borderColor="gray.300"
                    w="30"
                    h="32"
                    borderRadius="md"
                  >
                    <Text color="gray.500">Signature</Text>
                  </Flex>
                )
              )}
              </div>
              <Divider />
            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex justify-between">
                {editable ? (
                  <div className='flex space-x-4'>
                    <Button onClick={handleUpdateProfile} disabled={isButtonDisabled} variant="gradient" color='green' className='flex-1 text-xl'>Update Profile</Button>
                    <Button onClick={() => setEditable(false)} variant="gradient" color='red' className='flex-1 text-xl'>Cancel</Button>
                  </div>
                ) : (
                  <Button onClick={() => setEditable(true)} variant="gradient" color='blue' className='text-xl' fullWidth>Edit Profile</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Dashboard