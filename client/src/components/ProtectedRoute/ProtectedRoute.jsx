import { Link } from "react-router-dom";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from "@chakra-ui/react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // Get the JWT token from local storage
  const userInfo = localStorage.getItem("userInfo");
  const jwtToken = userInfo ? JSON.parse(userInfo).userToken : null;

  if (!jwtToken) {
    return (
      <Box mt={40} h={"100vh"}>
        <Alert
          status="warning"
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='150px'
        >
          <AlertIcon boxSize='40px' mr={0} mt={4}/>
          <Box flex="1">
            <AlertTitle mt={4} mb={1} fontSize='xxl'>Unauthorized Access!</AlertTitle>
            <AlertDescription>
              To access this page, you must be logged in. Please{" "}
              <Link
                to="/login"
                className="text-red-500 hover:underline hover:text-black"
              >
                login
              </Link>.
            </AlertDescription>
          </Box>
        </Alert>
      </Box>
    );
  }

  // If authenticated, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
