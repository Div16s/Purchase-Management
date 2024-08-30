import { Card, Typography, CardFooter, Button as TailwindButton } from "@material-tailwind/react";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { approvedForms, approvedFormsHOD, approvedFormsAccountSection, approvedFormsPurchaseSection, approvedFormsRegistrar } from "../../services/Apis";
import { useDisclosure, Stack, Skeleton, Alert, AlertIcon, AlertTitle, AlertDescription, Image } from "@chakra-ui/react";
import { Modal, Input, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button as ChakraButton } from "@chakra-ui/react";
import SP_101_PDF_URL_Generator from "../Forms/SP_101_PDF_URL_Generator";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TABLE_HEAD = ["Form ID", "User", "Budget Head", "Date", "Category", "Actions"];
const ROWS_PER_PAGE = 7;

// Function for fetching Approved forms for the specified user ID
const fetchApprovedFormsForUser = async (userId, jwtToken) => {
    try {
        const data = {
            userId
        };
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        }
        const response = await approvedForms(data, header);
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

// Function for fetching Approved forms for the specified username
const fetchApprovedFormsForHOD = async (department, email, jwtToken) => {
    try {
        const data = {
            department,
            email
        };
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        }
        const response = await approvedFormsHOD(data, header);
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
}

// Function for fetching Approved forms for account section
const fetchApprovedFormsForAccountSection = async (role, jwtToken) => {
    try {
        const data = { role };
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        }
        const response = await approvedFormsAccountSection(data, header);
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

// Function for fetching Approved forms for purchase section
const fetchApprovedFormsForPurchaseSection = async (role, jwtToken) => {
    try {
        const data = { role };
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        }
        const response = await approvedFormsPurchaseSection(data, header);
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

// Function for fetching Approved Forms for Registrar
const fetchApprovedFormsForRegistrar = async (role, jwtToken) => {
    try {
        const data = { role };
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        }
        const response = await approvedFormsRegistrar(data, header);
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


export default function TableWithStripedRows() {
    const role = JSON.parse(localStorage.getItem("userInfo")).role;
    const email = JSON.parse(localStorage.getItem("userInfo")).email;
    const userId = JSON.parse(localStorage.getItem("userInfo")).id;
    const department = JSON.parse(localStorage.getItem("userInfo")).department;
    const jwtToken = JSON.parse(localStorage.getItem("userInfo")).userToken;
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [approvedForms, setApprovedForms] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [formID, setFormID] = useState("");
    const [formsLoading, setFormsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

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
        const parts = dateString.split('/');
        if (parts.length !== 3) {
            throw new Error('Invalid date format. Please use "dd/mm/yyyy".');
        }
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${month}/${day}/${year}`;
    }

    const filteredForms = () => {
        console.log(approvedForms);
        let filteredData = approvedForms;
        if (selectedFilter === "userName") {
            filteredData = filteredData.filter((form) =>
                form.name.toLowerCase().includes(filterValue.toLowerCase())
            );
        } else if (selectedFilter === "department") {
            filteredData = filteredData.filter((form) =>
                form.department.toLowerCase().includes(filterValue.toLowerCase())
            );
        } else if (selectedFilter === "date") {
            if (startDate && endDate) {
                filteredData = filteredData.filter((form) => {
                    formDate = convertDate(formDate);
                    var formDate = (form.date);
                    formDate = convertDate(formDate);
                    formDate = new Date(formDate);
                    return formDate >= startDate && formDate <= endDate;
                });
            }
        } else if (selectedFilter === "budgetHead") {
            filteredData = filteredData.filter((form) =>
                form.budgetHead.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        return filteredData;
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
    }

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

    useEffect(() => {
        if (role === "HOD") {
            fetchApprovedFormsForHOD(department, email, jwtToken)
                .then((res) => {
                    if (res.status === 200) {
                        setApprovedForms(res.data);
                    }
                    else {
                        setError(res.error);
                    }
                })
                .catch(error => {
                    setError(error);
                }).finally(() => {
                    setFormsLoading(false);
                });
        }
        else if (role === "FACULTY") {
            fetchApprovedFormsForUser(userId, jwtToken)
                .then((res) => {
                    if (res.status === 200) {
                        setApprovedForms(res.data);
                    }
                    else {
                        setError(res.error);
                    }
                })
                .catch(error => {
                    setError(error);
                }).finally(() => {
                    setFormsLoading(false);
                });
        }
        else if (role === "REGISTRAR") {
            fetchApprovedFormsForRegistrar(role, jwtToken)
                .then((res) => {
                    if (res.status === 200) {
                        setApprovedForms(res.data);
                    }
                    else {
                        setError(res.error);
                    }
                })
                .catch(error => {
                    setError(error);
                }).finally(() => {
                    setFormsLoading(false);
                });
        }
        else if (department === "ACC") {
            fetchApprovedFormsForAccountSection(role, jwtToken)
                .then((res) => {
                    if (res.status === 200) {
                        setApprovedForms(res.data);
                    }
                    else {
                        setError(res.error);
                    }
                })
                .catch(error => {
                    setError(error);
                }).finally(() => {
                    setFormsLoading(false);
                });
        }
        else if (department === "PUR") {
            fetchApprovedFormsForPurchaseSection(role, jwtToken)
                .then((res) => {
                    if (res.status === 200) {
                        setApprovedForms(res.data);
                    }
                    else {
                        setError(res.error);
                    }
                })
                .catch(error => {
                    setError(error);
                }).finally(() => {
                    setFormsLoading(false);
                });
        }
    }, [setFormsLoading, setError]);

    useEffect(() => {
        const filteredData = filteredForms();
        const totalPageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);
        setCurrentPage(1);
        setFilteredData(filteredData);
        setTotalPages(totalPageCount);
    }, [selectedFilter, filterValue, startDate, endDate, approvedForms]);

    const indexOfLastRow = currentPage * ROWS_PER_PAGE;
    const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="h-screen">
            <h1 className="mt-32 -mb-10 ml-48 text-3xl text-blue-gray-900 font-semibold">
                <AiOutlineFileDone size={40} color="green" />
                APPROVED FORMS
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
                        {selectedFilter !== "date" &&
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
                        }
                    </div>

                    {(selectedFilter === "date") && (
                        <div className="date-Picker flex flex-row ml-96 -mt-14">
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
                        {!formsLoading && approvedForms.length === 0 && (
                            <Stack flexDir={"column"} height={"100vh"} mt={4}>
                                <Typography variant="large" color="blue-gray" className="text-center text-3xl font-semibold font-figtree">
                                    No Approved Forms Found !
                                </Typography>
                                <Image src={'3369473.jpg'} h={500} w={500} alt="No Forms Found" height={"auto"} objectFit="contain" />
                            </Stack>
                        )}
                        {!formsLoading && approvedForms.length > 0 && (
                            <Card className="mt-4 h-full w-4/5 overflowY-scroll">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th key={head} className="border-2 border-blue-gray-100 text-center text-white bg-green-400 p-4">
                                                    <Typography
                                                        color="white"
                                                        className="font-semibold text-xl leading-none"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRows.length > 0 && (currentRows.map(({ id, name, budgetHead, date, formCategory }, index) => (
                                            <tr key={id} className={`index % 2 === 0 ? "bg-blue-gray-50/50" : "" text-center border-2 border-blue-gray-100 justify-center`}>
                                                <SP_101_PDF_URL_Generator forms={approvedForms} formId={formID} department={department} onPdfGenerated={handlePdfGenerated} />
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="text-xl font-semibold">
                                                        {id}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="text-xl font-semibold">
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="text-xl font-semibold">
                                                        {budgetHead}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="text-xl font-semibold">
                                                        {date}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="text-xl font-semibold">
                                                        {formCategory}
                                                    </Typography>
                                                </td>
                                                {role === 'HOD' && (
                                                    <td className="p-4 flex justify-center gap-1">
                                                        <ChakraButton
                                                            colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                            mr={2} variant={"outline"}
                                                            type="button" fontSize={"normal"} p={2}
                                                            onClick={() => handleViewForm(id)}
                                                        >
                                                            View
                                                        </ChakraButton>
                                                        <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />

                                                    </td>
                                                )}
                                                {role === 'FACULTY' && (
                                                    <td className="p-4 justify-center gap-1">
                                                        <ChakraButton
                                                            colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                            mr={2} variant={"outline"}
                                                            type="button" fontSize={"normal"} p={2}
                                                            onClick={() => handleViewForm(id)}>
                                                            View
                                                        </ChakraButton>
                                                        <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />
                                                    </td>
                                                )}
                                                {department === 'ACC' && (
                                                    <td className="p-4 flex justify-center gap-1">
                                                        <ChakraButton
                                                            colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                            mr={2} variant={"outline"}
                                                            type="button" fontSize={"xl"} p={2}
                                                            onClick={() => handleViewForm(id)}
                                                        >
                                                            View
                                                        </ChakraButton>
                                                        <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />
                                                    </td>
                                                )}
                                                {department === 'PUR' && (
                                                    <td className="p-4 flex justify-center gap-1">
                                                        <ChakraButton
                                                            colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                            mr={2} variant={"outline"}
                                                            type="button" fontSize={"xl"} p={2}
                                                            onClick={() => handleViewForm(id)}
                                                        >
                                                            View
                                                        </ChakraButton>
                                                        <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />
                                                    </td>
                                                )}
                                                {role === 'REGISTRAR' && (
                                                    <td className="p-4 flex justify-center gap-1">
                                                        <ChakraButton
                                                            colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                            mr={2} variant={"outline"}
                                                            type="button" fontSize={"xl"} p={2}
                                                            onClick={() => handleViewForm(id)}
                                                        >
                                                            View
                                                        </ChakraButton>
                                                        <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />

                                                    </td>
                                                )}
                                            </tr>
                                        )))}
                                    </tbody>
                                </table>

                                {totalPages > 1 && (
                                    <CardFooter className="fixed-bottom flex items-center justify-between border-t border-blue-gray-50 p-4">
                                        <TailwindButton
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            variant="outlined"
                                            size="sm"
                                            disabled={currentPage === 1}
                                            className="flex justify-center items-center flex-col"
                                        >
                                            <FaArrowLeft /> Previous
                                        </TailwindButton>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <TailwindButton
                                                    key={i}
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    variant="outlined"
                                                    size="sm"
                                                    disabled={currentPage === i + 1}
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
                                            className="flex justify-center items-center flex-col"
                                        >
                                            <FaArrowRight /> Next
                                        </TailwindButton>
                                    </CardFooter>
                                )}
                            </Card>
                        )}
                    </div>
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
                    <ChakraButton colorScheme="red" size={"lg"} onClick={handleClosePdfViewer}>Close</ChakraButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}