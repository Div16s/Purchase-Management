import { Card, CardFooter, Typography, Button as TailwindButton } from "@material-tailwind/react";
import { MdOutlinePendingActions } from "react-icons/md";
import {
  pendingForms,
  pendingFormsHOD,
  approveFormRequest,
  rejectFormHODRequest,
  withdrawFormRequest
} from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDisclosure, Stack, Skeleton, Badge, Alert, AlertIcon, AlertTitle, AlertDescription, Image } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import SP_101_PDF_URL_Generator from "../Forms/SP_101_PDF_URL_Generator";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useShowToast from "../../hooks/useShowToast";


const TABLE_HEAD = ["Form ID", "User", "Budget Head", "Date", "Category", "Status", "Actions"];

const fetchPendingFormsForUser = async (userId, jwtToken) => {
  try {
    const data = {
      userId,
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`
    };
    const response = await pendingForms(data, header);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    else {
      return { status: response.status, error: response.response.data };
    }
  } catch (error) {
    return error.message;
  }
};

// Function to fetch pending forms for HOD of the specified department
const fetchPendingFormsForHOD = async (department, email, jwtToken) => {
  try {
    const data = {
      department,
      email
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`
    };
    const response = await pendingFormsHOD(data, header);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    else {
      return { status: response.status, error: response.response.data };
    }
  } catch (error) {
    return error.message;
  }
};

const ROWS_PER_PAGE = 7;

const FormsStatus = () => {
  const [selectedFilter, setSelectedFilter] = useState(""); // State variable to manage the selected filter option
  const [filterValue, setFilterValue] = useState(""); // State variable to manage the filter input value
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [userPendingForms, setUserPendingForms] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: approveFormModalOpen, onOpen: openApproveFormModal, onClose: closeApproveFormModal } = useDisclosure();
  const { isOpen: rejectFormModalOpen, onOpen: openRejectFormModal, onClose: closeRejectFormModal } = useDisclosure();
  const { isOpen: WithdrawFormModalOpen, onOpen: openWithdrawFormModal, onClose: closeWithdrawFormModal } = useDisclosure();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formID, setFormID] = useState("");
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  const email = JSON.parse(localStorage.getItem("userInfo")).email;
  const role = JSON.parse(localStorage.getItem("userInfo")).role;
  const department = JSON.parse(localStorage.getItem("userInfo")).department;
  const jwtToken = JSON.parse(localStorage.getItem("userInfo")).userToken;
  const navigate = useNavigate();
  const [formsLoading, setFormsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvedBy, setApprovedBy] = useState("REGISTRAR");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const showToast = useShowToast();

  const skeletonCount = Array.from({ length: 7 });

  const handleStartDateChange = (date) => {
    const formattedDate = date;
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date;
    setEndDate(formattedDate);
  };

  function convertDate(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("/");
    if (parts.length !== 3) {
      toast.error("Invalid date format, please use MM/DD/YYYY format");
    }
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${month}/${day}/${year}`;
  }

  const filteredForms = () => {
    var filteredFormData = userPendingForms;
    if (selectedFilter === "userName") {
      filteredFormData = filteredFormData.filter((form) =>
        form.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (selectedFilter === "department") {
      filteredFormData = filteredFormData.filter((form) =>
        form.department.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (selectedFilter === "date") {
      console.log("date start date : \n", startDate);
      if (startDate && endDate) {
        filteredFormData = filteredFormData.filter((form) => {
          console.log("form Date up ", formDate);
          formDate = convertDate(formDate);
          var formDate = form.date;
          formDate = convertDate(formDate);
          formDate = new Date(formDate);
          return formDate >= startDate && formDate <= endDate;
        });
      }
    } else if (selectedFilter === "budgetHead") {
      filteredFormData = filteredFormData.filter((form) =>
        form.budgetHead.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredFormData;
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setFilterValue("");
  };

  const handleFilterInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  // JSX for filter dropdown and input
  const filterOptions = [
    { value: "", label: "Select Filter" },
    { value: "userName", label: "User Name" },
    { value: "department", label: "Department" },
    { value: "date", label: "Date" },
    { value: "budgetHead", label: "Budget Head" },
  ];

  // Callback function to handle PDF url generation
  const handlePdfGenerated = (url) => {
    setPdfUrl(url);
  };

  // Function to handle viewing a form
  const handleViewForm = (id) => {
    setFormID(id);
    onOpen();
  };

  // Function to close the PDF viewer modal
  const handleClosePdfViewer = () => {
    setFormID("");
    setPdfUrl(null);
    onClose();
  };

  // Function to handle approving a form
  const approveForm = (id) => {
    setFormID(id);
    handleApproveForm();
  };

  // Function to handle sending a request to backend to approve a form
  const handleApproveForm = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const adminSignature = JSON.parse(
        localStorage.getItem("userInfo")
      ).signatureFile;
      const data = {
        formID: parseInt(formID),
        adminSignature,
        hasBeenApprovedBy: approvedBy,
        department
      };
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      };
      const response = await approveFormRequest(data, header);

      if (response.status === 200) {
        const successMessage = response.data.message;
        showToast("Approved", successMessage, 'success');
        navigate("/approvedForms");
      }
    } catch (error) {
      toast.error(response.response.data.err);
    } finally {
      setLoading(false);
      closeApproveFormModal();
    }
  };

  // Function to handle rejecting a form
  const rejectForm = (id) => {
    setFormID(id);
    openRejectFormModal();
  };

  const handleRejectForm = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = {
        formID: parseInt(formID),
        remarks,
      };
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      };
      const response = await rejectFormHODRequest(data, header);
      if (response.status === 200) {
        const successMessage = response.data.message;
        showToast("Rejected", successMessage, 'success');
        navigate("/rejectedForms");
      }
    } catch (error) {
      toast.error(response.response.data.err);
    } finally {
      setLoading(false);
      closeRejectFormModal();
    }
  };

  const withdrawForm = (id) => {
    setFormID(id);
    openWithdrawFormModal();
  }

  const handleWithdrawForm = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = {
        id: formID
      };
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      }

      const response = await withdrawFormRequest(data, header);

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(response.response.data.err);
    } finally {
      setLoading(false);
      closeWithdrawFormModal();
    }
  }

  useEffect(() => {
    if (role === "HOD") {
      fetchPendingFormsForHOD(department, email, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setUserPendingForms(res.data);
          }
          else {
            setError(res.error);
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setFormsLoading(false);
        });
    }
    else if (role === "FACULTY") {
      fetchPendingFormsForUser(userId, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setUserPendingForms(res.data);
          }
          else {
            setError(res.error);
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setFormsLoading(false);
        });
    }
  }, [setUserPendingForms, setFormsLoading, setError]);

  useEffect(() => {
    const filteredData = filteredForms();
    const totalPageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);
    setCurrentPage(1);
    setFilteredData(filteredData);
    setTotalPages(totalPageCount);
  }, [selectedFilter, filterValue, startDate, endDate, userPendingForms]);

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen">
      <h1 className="mt-32 -mb-10 ml-48 text-3xl text-blue-gray-900 font-semibold">
        <MdOutlinePendingActions size={40} color="orange" />
        FORMS STATUS
      </h1>
      <hr className="mt-12" />
      {error && (
        <div className="mt-40">
          <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='x-large'>
              {error.err}
            </AlertTitle>
            <AlertDescription mt={4} fontSize='medium' fontWeight={'semibold'}>
              {error.description}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {!error &&
        <>
          <div className="filter-content mt-4 ml-48">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              color="blue"
              size="sm"
              outline={false}
              className="p-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedFilter != "date" && (
              <Input
                type="text"
                value={filterValue}
                onChange={handleFilterInputChange}
                placeholder={`Filter by ${selectedFilter}`}
                size="lg"
                width="322px"
                margin="10px"
                variant="outline"
                borderWidth="1px"
                borderColor="blue.500"
                className="p-2 mt-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            )}
          </div>

          {selectedFilter === "date" && (
            <div
              className="date-Picker flex flex-row"
              style={{ marginLeft: "25rem", marginTop: "-2.5rem" }}
            >
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="From MM/DD/YYYY"
                size="lg"
                width="322px"
                margin="10px"
                variant="outline"
                borderWidth="1px"
                borderColor="blue.500"
                className="p-2 mt-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />

              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="TO MM/DD/YYYY"
                size="lg"
                width="322px"
                margin="10px"
                variant="outline"
                borderWidth="1px"
                borderColor="blue.500"
                className="p-2 mt-2 ml-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="flex flex-col justify-center items-center">
            {formsLoading && (
              <Stack mt={4} w={4 / 5} maxW={"full"}>
                <Skeleton height='40px' />
                {skeletonCount.map((_, index) => (
                  <Skeleton key={index} height='30px' />
                ))}
              </Stack>
            )}
            {!formsLoading && userPendingForms.length === 0 && (
              <Stack flexDir={"column"} height={"100vh"} mt={4}>
                <Typography variant="large" color="blue-gray" className="text-center text-3xl font-semibold font-figtree">
                  No Forms Found !
                </Typography>
                <Image src={'3369473.jpg'} h={500} w={500} alt="No Forms Found" height={"auto"} objectFit="contain" />
              </Stack>
            )}
            {!formsLoading && userPendingForms.length > 0 && (
              <Card className="mt-4 h-full w-4/5 overflowY-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-2 border-blue-gray-100 text-center text-white bg-orange-400 p-6"
                        >
                          <Typography
                            variant="small"
                            color="white"
                            className="font-semibold text-xl text-white leading-none"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map(({ id, name, budgetHead, date, formCategory, approvedBy, rejectedBy }, index) => (
                      <tr
                        key={id}
                        className={`index % 2 === 0 ? "bg-blue-gray-50/50" : "" text-center border-2 border-blue-gray-100 justify-center`}
                      >
                        <SP_101_PDF_URL_Generator
                          forms={userPendingForms}
                          formId={formID}
                          department={department}
                          onPdfGenerated={handlePdfGenerated}
                        />
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-semibold"
                          >
                            {id}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-semibold"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-semibold"
                          >
                            {budgetHead}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-semibold"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-semibold"
                          >
                            {formCategory}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xl font-semibold"
                          >
                            {role === "FACULTY" && (
                              rejectedBy === "NONE" ? (
                                <>
                                  {approvedBy === "NONE" && (
                                    <Badge variant='subtle' colorScheme='orange' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                      IN PROCESS
                                    </Badge>

                                  )}

                                  {approvedBy === "INITIAL_HOD" && (
                                    <Badge variant='subtle' colorScheme='green' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                      Passed by HOD To Account Section
                                    </Badge>
                                  )}

                                  {approvedBy !== "NONE" && approvedBy !== "INITIAL_HOD" && (
                                    <Badge variant='subtle' colorScheme='green' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                      Approved by {approvedBy}
                                    </Badge>
                                  )}
                                </>
                              ) : (
                                <Badge variant='subtle' colorScheme='red' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                  REJECTED BY {rejectedBy}
                                </Badge>
                              )
                            )}
                            {role === "HOD" && (
                              rejectedBy === "NONE" ? (
                                approvedBy === "INITIAL_HOD" ? (
                                  <Badge variant='subtle' colorScheme='orange' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                    IN PROCESS
                                  </Badge>
                                ) : (
                                  <Badge variant='subtle' colorScheme='green' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                    Approved by {approvedBy}
                                  </Badge>
                                )
                              ) : (
                                <Badge variant='subtle' colorScheme='red' fontSize={"lg"} fontWeight={"semibold"} p={1}>
                                  REJECTED BY {rejectedBy}
                                </Badge>
                              )
                            )}
                          </Typography>
                        </td>
                        {role === "FACULTY" && (
                          <td className="p-4 flex justify-center gap-1">
                            <Button
                              variant={"outline"}
                              p={2}
                              fontSize={"xl"}
                              colorScheme="blue"
                              size={"md"}
                              fontFamily={"figtree"}
                              mr={2}
                              type="button"
                              onClick={() => handleViewForm(id)}
                            >
                              View
                            </Button>
                            <ViewPDFModal
                              isOpen={isOpen}
                              onClose={onClose}
                              pdfUrl={pdfUrl}
                              handleClosePdfViewer={handleClosePdfViewer}
                            />

                            <Button onClick={() => withdrawForm(id)} fontSize={"xl"} p={2} colorScheme="red">
                              Withdraw
                            </Button>
                            <WithdrawFormModel isOpen={WithdrawFormModalOpen} onClose={closeWithdrawFormModal} handleWithdrawForm={handleWithdrawForm} loading={loading} />
                          </td>
                        )}
                        {role === "HOD" && (
                          <td className="p-4 flex justify-center gap-1">
                            <Button
                              variant={"outline"}
                              p={2}
                              fontSize={"xl"}
                              colorScheme="blue"
                              size={"md"}
                              fontFamily={"figtree"}
                              mr={2}
                              type="button"
                              onClick={() => handleViewForm(id)}
                            >
                              View
                            </Button>
                            <ViewPDFModal
                              isOpen={isOpen}
                              onClose={onClose}
                              pdfUrl={pdfUrl}
                              handleClosePdfViewer={handleClosePdfViewer}
                            />
                            <Button
                              variant={"outline"}
                              p={2}
                              fontSize={"xl"}
                              isDisabled={approvedBy === "REGISTRAR" ? false : true}
                              colorScheme="green"
                              mr={2}
                              size={"md"}
                              fontFamily={"figtree"}
                              onClick={() => approveForm(id)}
                            >
                              Approve
                            </Button>
                            <ApproveFormModal
                              isOpen={approveFormModalOpen}
                              onClose={closeApproveFormModal}
                              handleApproveForm={handleApproveForm}
                              loading={loading}
                            />
                            <Button
                              variant={"outline"}
                              p={2}
                              fontSize={"xl"}
                              isDisabled={rejectedBy !== "NONE" ? false : true}
                              colorScheme="red"
                              size={"md"}
                              fontFamily={"figtree"}
                              onClick={() => rejectForm(id)}
                            >
                              Reject
                            </Button>
                            <RejectFormModal
                              isOpen={rejectFormModalOpen}
                              onClose={closeRejectFormModal}
                              handleRejectForm={handleRejectForm}
                              loading={loading}
                              setRemarks={setRemarks}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <TailwindButton
                      onClick={() => handlePageChange(currentPage - 1)}
                      variant="outlined"
                      size="sm"
                      disabled={currentPage === 1}
                      className="flex justify-center items-center"
                    >
                      <FaArrowLeft /> Previous
                    </TailwindButton>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <TailwindButton
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          variant="outlined"
                          size="sm"
                          className="flex justify-center items-center"
                        >
                          {i + 1}
                        </TailwindButton>
                      ))}
                    </div>
                    <TailwindButton
                      onClick={() => handlePageChange(currentPage + 1)}
                      variant="outlined"
                      size="sm"
                      disabled={currentPage === totalPages}
                      className="flex justify-center items-center"
                    >
                      Next <FaArrowRight />
                    </TailwindButton>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
          <ToastContainer />
        </>
      }
    </div>
  );
}

//Component for ViewPDF Modal
const ViewPDFModal = ({ isOpen, onClose, pdfUrl, handleClosePdfViewer }) => {
  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton size={"lg"} />
        <ModalBody>
          <iframe src={pdfUrl} width="100%" height="500px"></iframe>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" size={"lg"} onClick={handleClosePdfViewer}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

//Component for Approve Form Modal
const ApproveFormModal = ({ isOpen, onClose, handleApproveForm, loading }) => {
  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton size={"lg"} />
        <ModalBody>
          <FormControl>
            <FormLabel marginRight={2}>
              <h1 className="text-2xl font-figtree font-semibold">
                Enter Remarks
              </h1>
            </FormLabel>
            <Input type="text" borderWidth="1px" borderColor="gray.400" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            size={"lg"}
            isLoading={loading}
            onClick={handleApproveForm}
          >
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

//Component for Reject Form Modal
const RejectFormModal = ({ isOpen, onClose, handleRejectForm, loading, setRemarks }) => {
  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton size={"lg"} />
        <ModalBody>
          <FormControl>
            <FormLabel marginRight={2}>
              <h1 className="text-2xl font-figtree font-semibold">
                Enter Remarks
              </h1>
            </FormLabel>
            <Input
              onChange={(e) => setRemarks(e.target.value)}
              type="text"
              borderWidth="1px"
              borderColor="gray.400"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            size={"lg"}
            isLoading={loading}
            onClick={handleRejectForm}
          >
            Reject
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const WithdrawFormModel = ({ isOpen, onClose, handleWithdrawForm, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight={"bold"} fontSize={"medium"}>Withdraw Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to withdraw this form ?
        </ModalBody>

        <ModalFooter>
          <Button mr={3} fontSize={"xl"} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" fontSize={"xl"} isLoading={loading} onClick={handleWithdrawForm}>
            Withdraw
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormsStatus