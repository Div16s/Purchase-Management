import { Card, CardFooter, Typography, Button as TailwindButton } from "@material-tailwind/react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { rejectedFormsUser, rejectedFormsHOD, rejectedFormsAccountSection, rejectedFormsPurchaseSection, rejectedFormsRegistrar, withdrawFormRequest } from "../../services/Apis";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Input, Button, Stack, Skeleton, Image } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SP_101_PDF_URL_Generator from "../Forms/SP_101_PDF_URL_Generator";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Form ID", "User", "Budget Head", "Date", "Category", "Actions"];
const ROWS_PER_PAGE = 7;

const fetchRejectedFormsForUser = async (userId, department, jwtToken) => {
  try {
    const data = {
      userId,
      department
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    }
    const response = await rejectedFormsUser(data, header);
    console.log(response);
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

const fetchRejectedFormsForHOD = async (department, email, jwtToken) => {
  try {
    const data = {
      department,
      email
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await rejectedFormsHOD(data, header);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    else {
      return { status: response.status, error: response.response.data };
    }
  } catch (error) {
    return error.message;
  }
}

const fetchRejectedFormsForAccountSection = async (role, jwtToken) => {
  try {
    const data = {
      role
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await rejectedFormsAccountSection(data, header);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    else {
      return { status: response.status, error: response.response.data };
    }
  } catch (error) {
    return error.message;
  }
}

const fetchRejectedFormsForPurchaseSection = async (role, jwtToken) => {
  try {
    const data = {
      role
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await rejectedFormsPurchaseSection(data, header);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    else {
      return { status: response.status, error: response.response.data };
    }
  } catch (error) {
    return error.message;
  }
}

const fetchRejectedFormsForRegistrar = async (role, jwtToken) => {
  try {
    const data = {
      role
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await rejectedFormsRegistrar(data, header);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    else {
      return { status: response.status, error: response.response.data };
    }
  } catch (error) {
    return error.message;
  }
}

export default function RejectedForms() {

  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  const email = JSON.parse(localStorage.getItem("userInfo")).email;
  const role = JSON.parse(localStorage.getItem("userInfo")).role;
  const department = JSON.parse(localStorage.getItem("userInfo")).department;
  const jwtToken = JSON.parse(localStorage.getItem("userInfo")).userToken;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rejectedForms, setRejectedForms] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: ViewRemarksModalOpen, onOpen: openViewRemarksModal, onClose: closeViewRemarksModal } = useDisclosure();
  const { isOpen: WithdrawFormModalOpen, onOpen: openWithdrawFormModal, onClose: closeWithdrawFormModal } = useDisclosure();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formID, setFormID] = useState("");
  const [formRemarks, setFormRemarks] = useState("");
  const [formsLoading, setFormsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const skeletonCount = Array.from({ length: 7 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

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
    console.log("datestring:  ", dateString);
    const parts = dateString.split("/"); // Split on slashes
    if (parts.length !== 3) {
      throw new Error('Invalid date format. Please use "dd/mm/yyyy".');
    }
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${month}/${day}/${year}`;
  }

  const filteredForms = () => {
    let filteredFormData = rejectedForms;
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

  // Function to handle filter selection
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setFilterValue("");
  };

  // Function to handle filter input value change
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
  const ViewRemarks = (remarks) => {
    setFormRemarks(remarks);
    openViewRemarksModal();
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
        toast.success("Form deleted successfully");
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
      fetchRejectedFormsForHOD(department, email, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setRejectedForms(res.data);
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
    } else if (role === "FACULTY") {
      fetchRejectedFormsForUser(userId, department, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setRejectedForms(res.data);
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
    } else if (department === "ACC") {
      fetchRejectedFormsForAccountSection(role, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setRejectedForms(res.data);
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
    } else if (department === "PUR") {
      fetchRejectedFormsForPurchaseSection(role, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setRejectedForms(res.data);
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
    } else if (role === "REGISTRAR") {
      fetchRejectedFormsForRegistrar(role, jwtToken)
        .then((res) => {
          if (res.status === 200) {
            setRejectedForms(res.data);
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
  }, [setFormsLoading, setRejectedForms, setError]);

  useEffect(() => {
    const filteredData = filteredForms();
    const totalPageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);
    setCurrentPage(1);
    setFilteredData(filteredData);
    setTotalPages(totalPageCount);
  }, [selectedFilter, filterValue, startDate, endDate, rejectedForms]);

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen">
      <h1 className="mt-32 -mb-10 ml-48 text-3xl text-blue-gray-900 font-semibold">
        <MdOutlineCancelPresentation size={40} color="red" />
        REJECTED FORMS
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
            {!formsLoading && rejectedForms.length === 0 && (
              <Stack flexDir={"column"} height={"100vh"} mt={4}>
                <Typography variant="large" color="blue-gray" className="text-center text-3xl font-semibold font-figtree">
                  No Rejected Forms Found !
                </Typography>
                <Image src={'3369473.jpg'} h={500} w={500} alt="No Forms Found" height={"auto"} objectFit="contain" />
              </Stack>
            )}
            {!formsLoading && rejectedForms.length > 0 && (
              <Card className="mt-4 h-full w-4/5 overflowY-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-2 border-blue-gray-100 text-center text-white bg-red-700 p-4"
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
                    {(currentRows.length > 0) && (currentRows.map(({ id, name, budgetHead, date, formCategory, remarks }, index) => (
                      <tr
                        key={id}
                        className={`index % 2 === 0 ? "bg-blue-gray-50/50" : "" text-center border-2 border-blue-gray-100 justify-center`}
                      >
                        <SP_101_PDF_URL_Generator
                          forms={rejectedForms}
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
                          </td>
                        )}
                        {role === "FACULTY" && (
                          <td className="p-4 justify-center gap-1">
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
                              colorScheme="orange"
                              size={"md"}
                              fontFamily={"figtree"}
                              mr={2}
                              type="button"
                              onClick={() => ViewRemarks(remarks)}
                            >
                              Remarks
                            </Button>
                            <ViewRemarksModel
                              isOpen={ViewRemarksModalOpen}
                              onClose={closeViewRemarksModal}
                              remarks={formRemarks}
                            />
                            <Button onClick={() => withdrawForm(id)} fontSize={"large"} p={2} colorScheme="red">
                              <MdDelete />
                            </Button>
                            <WithdrawFormModel isOpen={WithdrawFormModalOpen} onClose={closeWithdrawFormModal} handleWithdrawForm={handleWithdrawForm} loading={loading}/>
                          </td>
                        )}
                        {department === "ACC" && (
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
                          </td>
                        )}
                        {department === "PUR" && (
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
                          </td>
                        )}
                        {role === "REGISTRAR" && (
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
                          </td>
                        )}
                      </tr>
                    )
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
          <Button colorScheme="red" size={"lg"} onClick={handleClosePdfViewer}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

//Component for Viewing Remarks Modal
const ViewRemarksModel = ({ isOpen, onClose, remarks }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remarks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{remarks}</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
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
        <ModalHeader fontWeight={"bold"} fontSize={"medium"}>Delete Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this form ?
        </ModalBody>

        <ModalFooter>
          <Button  mr={3} fontSize={"xl"} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" fontSize={"xl"} isLoading={loading} onClick={handleWithdrawForm}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
