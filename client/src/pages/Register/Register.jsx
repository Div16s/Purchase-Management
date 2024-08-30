import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import { sendOTP_register } from "../../services/Apis";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Button } from "@material-tailwind/react";
import { Container, Input, Text } from "@chakra-ui/react";

// for dropdown
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let [selectedRole, setSelectedRole] = useState("");
  let [selectedDept, setSelectedDept] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleDeptSelection = (dept) => {
    setSelectedDept(dept);
  };

  // Validation checks and form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const isValid = validateForm();

    if (isValid) {
      try {
        const userDetails = {
          name: name,
          email: email,
          role: selectedRole,
          department: selectedDept,
        };

        const response = await sendOTP_register(userDetails);

        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/register/user/otp", { state: userDetails });
          }, 2000);
          setName("");
          setEmail("");
          setSelectedRole("");
          setSelectedDept("");
        } else {
          toast.error(response.response.data.err);
        }
      } catch (error) {
        toast.error("An error occurred while sending OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (name === "") {
      toast.error("Enter your name");
      isValid = false;
    } else if (email === "") {
      toast.error("Enter your email");
      isValid = false;
    } else if (!email.includes("@iitrpr.ac.in")) {
      toast.error("Enter a valid email");
      isValid = false;
    } else if (selectedRole === "") {
      toast.error("Select your role");
      isValid = false;
    } else if (
      (selectedRole.includes("FACULTY") ||
      selectedRole.includes("HOD")) &&
      selectedDept === ""
    ) {
      toast.error("Select your department");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center mt-4 h-screen">
      <Container className="bg-white p-8 rounded shadow-md" w={400} h={500}>
        <Text className="font-semibold mb-1" fontSize={"x-large"}>Hi there,</Text>
        <Text className="font-semibold mb-6" fontSize={"x-large"}>Signup to continue!</Text>
        <form method="POST">
          <div class="mb-4">
            <label
              for="name"
              className="-ml-1 text-2xl font-medium text-gray-600"
            >
              Name
            </label>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              h={14}
              fontSize={"initial"}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name here..."
              className="mt-1 p-2 w-full text-lg border rounded-md focus:outline-none"
            />
          </div>
          <div class="mb-2">
            <label
              for="email"
              className="block -ml-1 text-2xl font-medium text-gray-600"
            >
              Email
            </label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              h={14}
              fontSize={"initial"}
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email here..."
              className="mt-1 p-2 w-full text-lg border rounded-md"
            />
          </div>

          <Menu
            as="div"
            className="relative inline-block text-left w-full py-2"
          >
            <label
              for="department"
              className="-ml-1 text-2xl font-medium text-gray-600"
            >
              Role
            </label>
            <div>
              <Menu.Button className="inline-flex justify-between mt-1 p-2 w-full text-xxl font-normal border rounded-md outline outline-1 outline-gray-300 bg-white px-2 py-2  hover:bg-gray-700 hover:text-white">
                {selectedRole || "Select your role"}
                {!selectedRole && (
                  <ChevronDownIcon
                    className="mr-4  h-8 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                )}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("FACULTY")}
                        className={classNames(
                          active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        FACULTY
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        HOD
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("ACCOUNTANT")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        ACCOUNTANT
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("JAO")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JAO
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("AO")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        AO
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("AR")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        AR
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("JR")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JR
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("DR")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        DR
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("JS")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JS
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleRoleSelection("REGISTRAR")}
                        className={classNames(
                           active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        REGISTRAR
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>


          {
            (selectedRole === "HOD" || selectedRole === "FACULTY") ?


              <Menu
                as="div"
                className="relative inline-block text-left w-full py-2"
              >
                <label
                  for="department"
                  className="bock -ml-1 text-2xl font-semibold text-gray-600"
                >
                  Department
                </label>
                <div>
                  <Menu.Button className="inline-flex justify-between mt-1 p-2 w-full text-xxl font-normal border rounded-md outline outline-1 outline-gray-300 bg-white px-2 py-2  hover:bg-gray-700 hover:text-white">
                    {selectedDept || "Select Your  Department"}
                    {!selectedDept && (
                      <ChevronDownIcon
                        className="mr-2  h-7 w-5 font-bold text-gray-600"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  right-0 z-10 mt-2 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Computer Science Eng")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Computer Science Eng
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Electrical Engineering")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Electrical Engineering
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Mathematics & Computing")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Mathematics & Computing
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Chemical Engineering")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Chemical Engineering
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => handleDeptSelection("Civil Engineering")}
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Civil Engineering
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Biomedical Engineering")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Biomedical Engineering
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Physics Department")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Physics Department
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("Artificial Intelligence")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Artificial Intelligence
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => handleDeptSelection("Machine Learning")}
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Machine Learning
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => handleDeptSelection("Others")}
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Others
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> : <div></div>
          }
          {
            (selectedRole === "JAO" || selectedRole === "AO"|| selectedRole==="JR"||selectedRole==="ACCOUNTANT"||selectedRole==="AR"||selectedRole==="DR"||selectedRole==="JS"||selectedRole==="REGISTRAR") ?


              <Menu
                as="div"
                className="relative inline-block text-left w-full py-2"
              >
                <label
                  for="department"
                  className="bock -ml-1 text-2xl font-semibold text-gray-600"
                >
                  Department
                </label>
                <div>
                  <Menu.Button className="inline-flex justify-between mt-1 p-2 w-full text-xxl font-normal border rounded-md outline outline-1 outline-gray-300 bg-white px-2 py-2  hover:bg-gray-700 hover:text-white">
                    {selectedDept || "Select Your  Department"}
                    {!selectedDept && (
                      <ChevronDownIcon
                        className="mr-2  h-7 w-5 font-bold text-gray-600"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  right-0 z-10 mt-2 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("PURCHASE")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            PURCHASE
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("ACCOUNTS")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            ACCOUNTS
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              handleDeptSelection("ADMINISTRATION")
                            }
                            className={classNames(
                              active
                            ? "bg-red-400 text-white-900"
                            : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            ADMINISTRATION
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> : <div></div>
          }

          {/* <button
            onClick={handleRegister}
            disabled={isButtonDisabled}
            type="submit"
            className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-full m-3   block font-bold shadow-md shadow-gray-400 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
          >
            Register
          </button> */}
          <Button onClick={handleRegister} loading = {loading} variant="gradient" size="lg" color="blue" className="mt-4 text-xl font-figtree">
            Signup
          </Button>
          <div className="mb-4 mt-2">
            <p className="text-red-400 font-normal">
              Already have an account?{" "}
              <NavLink
                to={"/login"}
                className={"font-bold hover:underline text-blue-300 hover:text-blue-600"}
              >
                Login!
              </NavLink>
            </p>
          </div>
        </form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Register;
