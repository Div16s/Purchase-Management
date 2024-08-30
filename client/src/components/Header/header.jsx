import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Button as ChakraButton, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import {RxAvatar} from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const department = user ? user.department : "";

  useEffect(() => {
    if (user && user.userToken) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      console.log("Valid user");
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigate("/");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );

    const closeMenu = () => {
      setOpenNav(false);
    };

    if (openNav) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [openNav]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {userRole === "FACULTY" && (
        <>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link
              to={"/forms/SP101"}
              className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm"
            >
              SP101 FORM
            </Link>
          </ChakraButton>
        
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/approvedForms"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              APPROVED FORMS
            </Link>
          </ChakraButton>

          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/formsStatus"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              FORMS STATUS
            </Link>
          </ChakraButton>

          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link
              to={"/rejectedForms"}
              className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm"
            >
              REJECTED FORMS
            </Link>
          </ChakraButton>
        </>
      )}
      {userRole === "HOD" && (
        <>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/approvedForms"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              APPROVED FORMS
            </Link>
          </ChakraButton>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/pendingForms"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              PENDING FORMS
            </Link>
          </ChakraButton>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/rejectedForms"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              REJECTED FORMS
            </Link>
          </ChakraButton>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/formsStatus"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              FORMS STATUS
            </Link>
          </ChakraButton>
        </>
      )}
      {(department === "ACC" || department === "PUR" || userRole === "REGISTRAR") && (
        <>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/approvedForms"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              APPROVED FORMS
            </Link>
          </ChakraButton>
          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link to={"/pendingForms"} className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm">
              PENDING FORMS
            </Link>
          </ChakraButton>

          <ChakraButton
            as="li"
            size={"lg"}
            variant="outline"
            colorScheme="gray.200"
          >
            <Link
              to={"/rejectedForms"}
              className="flex items-center text-lg font-custom font-semibold rounded-md shadow-sm"
            >
              REJECTED FORMS
            </Link>
          </ChakraButton>
        </>
      )}
    </ul>
  );

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <div className="flex items-center gap-x-2">
            <div className="relative">
              <ChakraButton
                variant={"solid"}
                color={"white"}
                colorScheme="teal"
                size="lg"
                onClick={(e) =>{e.stopPropagation(); setOpenNav(!openNav)}}
                className="text-black text-base shadow-md"
              >
                <RxAvatar size={22} />
              </ChakraButton>
              {openNav && (
                <div className="absolute right-0 mt-1 w-36 h-28 py-2 bg-white text-black font-normal rounded shadow-lg" style={{ fontSize: "12px" }}>
                  <Link to="/dashboard" className="block font-medium text-xl px-4 py-2 hover:text-black hover:bg-gray-100">Dashboard</Link>
                  <hr className="my-1 border-gray-300"></hr>
                  <button onClick={handleLogout} className="flex justify-around mt-2 w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none">
                    <h1 className="-mt-1 font-medium text-xl">Logout</h1>
                    <FiLogOut />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="lg">
            <Link className="text-white text-xl font-figtree" to={"/login"}>Login</Link>
          </Button>
          <Button variant="filled" size="lg">
            <Link className="text-white text-xl font-figtree" to={"/signup"}>Signup</Link>
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="-m-0 max-h-[768px] w-[calc(100%+46px)] mb-18">
      <Navbar className="fixed border-0 left-0 right-0 top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" style={{ backgroundColor: "rgb(0,82,195)" }}>
        <div className="flex items-center justify-between text-white-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer p-2 text-4xl font-bold font-header rounded-md text-#fff hover:text-gray-300"
          >
            PURCHASE MANAGEMENT
          </Typography>
          <div className="flex items-center gap-4">

            {isAuthenticated && (
              <div className="hidden lg:block">{navList}</div>
            )}
            {renderAuthButtons()}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;