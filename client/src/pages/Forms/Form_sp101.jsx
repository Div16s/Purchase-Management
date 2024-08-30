import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Form_sp101.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextFormSP101Data from "../../Context/ContextFormSP101Data";
import SP_101 from './SP_101';
import { submitFormSP101 } from "../../services/Apis";
import { Button } from "@material-tailwind/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Input, useDisclosure } from "@chakra-ui/react";

const Form_sp101 = () => {

  const [sendFormTo, setSendFormTo] = useState("HOD");

  //purchase section
  const [startPageNo, setStartPageNo] = useState(null);
  const [endPageNo, setEndPageNo] = useState(null);
  const [rsInValue, setRsInValue] = useState(null);
  const [rsInWords, setRsInWords] = useState(null);

  //budget section
  const [budgetAvailable, SetBudgetAvailable] = useState(null);
  const [budgetBooked, setBudgetBooked] = useState(null);
  const [balanceBudget, setBalanceBudget] = useState(null);

  // Define state for items and input values
  const [budgetHead, setBudgetHead] = useState("");
  const [sanctionedBudget, setSanctionedBudget] = useState("");
  const [approxCost, setApproxCost] = useState("");
  const [items, setItems] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tax, setTax] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited
  const [category, setCategory] = useState("");
  const [budgetaryApprovalEnclosed, setBudgetaryApprovalEnclosed] = useState("")
  const [readyForInstallation, setReadyForInstallation] = useState("")
  const [goodForResearchPurpose, setGoodForResearchPurpose] = useState("")
  const [GEM, setGEM] = useState("")
  const [fileNo, setFileNo] = useState("");
  const [gemarDetails, setGemarDetails] = useState("")
  const [ptsId, setPtsId] = useState("")
  const [modeOfEnquiry, setModeOfEnquiry] = useState("")
  const [nameOfSupplier, setNameOfSupplier] = useState("")
  const [numberOfQuotation, setNumberOfQuotation] = useState("")
  const [quotationNumber, setQuotationNumber] = useState("")
  const [date, setDate] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("")
  const [deliveryPeriod, setDeliveryPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // For controlling alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // Message to display in the alert
  const [alertStatus, setAlertStatus] = useState(""); // Status for alert (success/error)
  const [countdown, setCountdown] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signatureFile = JSON.parse(localStorage.getItem("userInfo")).signatureFile;
  const department = JSON.parse(localStorage.getItem("userInfo")).department;
  const role = JSON.parse(localStorage.getItem("userInfo")).role;
  const jwtToken = JSON.parse(localStorage.getItem("userInfo")).userToken;

  const navigate = useNavigate();


  const { formData, setFormData } = useContext(ContextFormSP101Data);

  const handleDateChange = (e) => {
    const inputValue = e.target.value;

    // Split the date string by '-' delimiter
    const parts = inputValue.split('-');

    //Rearranging the parts to format the date as day/month/year
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

    //Setting the formatted date in the state
    setDate(formattedDate);
  };


  //to handle attach  PDF  for not taking product from GEM 
  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  //function for handling downloading pdf form
  const handleDownloadPDF = (e) => {
    e.preventDefault();

    //error handling 
    // if (budgetHead === null || sanctionedBudget === null) {
    //   toast.error("All fields are required.");
    //   return;
    // }
    if (signatureFile === undefined) {
      toast.error("Please upload your signature in profile section.");
      return;
    }
    setFormData({
      budgetHead, sanctionedBudget, approxCost, items, category,
      budgetaryApprovalEnclosed,
      readyForInstallation,
      goodForResearchPurpose,
      GEM, gemarDetails, ptsId,
      modeOfEnquiry,
      nameOfSupplier,
      numberOfQuotation, selectedFile,
      quotationNumber,
      date,
      modeOfPayment,
      deliveryPeriod, budgetAvailable, budgetBooked, balanceBudget,
      fileNo,
    });
  }

  useEffect(() => {
    if (signatureFile && formData) {
      SP_101({ formData });
    }
  }, [formData]);



  const handlePopup = async (e) => {
    e.preventDefault();
    if (signatureFile === "") {
      toast.error("Please upload the signature first.")
      return;
    }

    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      try {
        const userName = JSON.parse(localStorage.getItem("userInfo")).name;
        const userId = JSON.parse(localStorage.getItem("userInfo")).id;
        const formCategory = "SP101";
        const formData = new FormData();
        if (selectedFile) {
          formData.append("title", selectedFile?.name);
          formData.append("file", selectedFile);
        }

        const inputData = {
          userName,
          userId,
          department,
          role,
          fileNo,
          sendFormTo,
          formCategory,
          budgetHead,
          sanctionedBudget,
          approxCost, items, category,
          budgetaryApprovalEnclosed,
          readyForInstallation,
          goodForResearchPurpose,
          GEM,
          GEM_PDF: formData,
          modeOfEnquiry,
          nameOfSupplier,
          numberOfQuotation,
          quotationNumber,
          date,
          modeOfPayment,
          deliveryPeriod
        }
        console.log("Input Data: ", inputData);
        const header = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        };
        const response = await submitFormSP101(inputData, header);
        if (response.status === 200) {
          setAlertMessage("Form submitted! You will be redirected to the Form Status page.");
          setAlertStatus("success");
          setShowAlert(true);

          // Scroll to alert element
          const alertElement = document.getElementById('alert');
          if (alertElement) {
            alertElement.scrollIntoView({ behavior: 'smooth' });
          }

          let count = 0;
          const interval = setInterval(() => {
            count += 1;
            setCountdown(count);
          }, 1000);

          setTimeout(() => {
            clearInterval(interval);
            navigate("/formsStatus");
          }, 5000);
        } else {
          toast.error(response.response.data.err);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  //function for handling submit click
  const handleSubmit = async (e) => {
    e.preventDefault();
    onOpen();
  }

  // Function to handle adding new item
  const addItem = () => {
    const newItem = {
      itemDescription: itemDescription,
      quantity: quantity,
      price: price,
      tax: tax,
    };

    if (!itemDescription || !quantity || !price || !tax) {
      toast.error("All fields are required.");
      return;
    }
    // Update items array using the functional form of setItems
    setItems(prevItems => {
      const updatedItems = [...prevItems, newItem]; // Append new item to previous items array
      console.log("Updated Items: ", updatedItems);
      return updatedItems;
    });
    // Reset input values
    setItemDescription("");
    setQuantity("");
    setPrice("");
    setTax("");
  };

  // Function to handle editing an item
  const editItem = (index) => {
    // Set input values to values of item being edited
    setItemDescription(items[index].itemDescription);
    setQuantity(items[index].quantity);
    setPrice(items[index].price);
    setTax(items[index].tax);
    setEditingIndex(index);
  };

  // Function to handle deleting an item
  const deleteItem = (index) => {
    // Filter out the item at the given index
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };


  // Function to handle updating an item
  const updateItem = () => {
    if (!itemDescription || !quantity || !price || !tax) {
      toast.error("All fields are required.");
      return;
    }
    const updatedItems = [...items];
    updatedItems[editingIndex] = {
      itemDescription: itemDescription,
      quantity: quantity,
      price: price,
      tax: tax,
    };
    setItems(updatedItems);

    setItemDescription("");
    setQuantity("");
    setPrice("");
    setTax("");
    setEditingIndex(null);
  };


  // Function to validate the form
  const validateForm = () => {
    let isValid = true;

    if (budgetHead === "" || budgetHead === null) {
      toast.error("Enter Budget Head");
      isValid = false;
    } else if (sanctionedBudget === "" || sanctionedBudget === null) {
      toast.error("Enter Sanctioned Budget");
      isValid = false;
    } else if (items.length === 0) {
      toast.error("Enter at least one Item");
      isValid = false;
    } else if (category === "") {
      toast.error("Select category");
      isValid = false;
    } else if (budgetaryApprovalEnclosed === "") {
      toast.error("Select Budgetary Approval Enclosed");
      isValid = false;
    } else if (readyForInstallation === "") {
      toast.error("Select ready for installation");
      isValid = false;
    } else if (goodForResearchPurpose === "") {
      toast.error("Select Research Purpose or Other Purpose");
      isValid = false;
    } else if (modeOfEnquiry === "") {
      toast.error("Select Mode of Enquiry");
      isValid = false;
    } else if (modeOfEnquiry === "") {
      toast.error("Select Mode of Enquiry");
      isValid = false;
    } else if (GEM === "") {
      toast.error("Select GeM Purchase");
      isValid = false;
    } else if (GEM === "No") {
      if (gemarDetails === "") {
        toast.error("Enter GeMAR Details");
        isValid = false;
      }
      if (ptsId === "") {
        toast.error("Enter PTS ID");
        isValid = false;
      }
    } else if (goodForResearchPurpose === "") {
      toast.error("Select Research Purpose or Other Purpose");
      isValid = false;
    } else if (nameOfSupplier === "") {
      toast.error("Select Name of Supplier");
      isValid = false;
    } else if (numberOfQuotation === "") {
      toast.error("Select Number of Quotation");
      isValid = false;
    } else if (quotationNumber === "") {
      toast.error("Select Quotation Number");
      isValid = false;
    } else if (date === "") {
      toast.error("Select Date");
      isValid = false;
    } else if (modeOfPayment === "") {
      toast.error("Select Mode of Payment");
      isValid = false;
    } else if (deliveryPeriod === "") {
      toast.error("Select Delivery Period");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div>
      {showAlert && (
        <div className="h-screen" id="alert">
          <Alert
            status={alertStatus}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mt={80}
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} mt={2} />
            <AlertTitle mt={4} mb={1} fontSize="large">
              {alertStatus === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription maxWidth="md" fontSize={"medium"}>
              {alertMessage}
            </AlertDescription>
            <CircularProgress
              mt={4}
              value={countdown * 20}
              size="80px"
              color="green.400"
            >
              <CircularProgressLabel>
                {countdown}
              </CircularProgressLabel>
            </CircularProgress>
          </Alert>
        </div>
      )}
      {!showAlert && (<div className="container-formsp101 mt-24">
        <div className="wizard" id="myWizard">
          <section>
            <h4 className="page-title text-center font-semibold font-figtree">
              INDENT FOR PURCHASES BELOW Rs.25000
            </h4>
          </section>
          <div className="wizard__progress">
            <ul className="wizard__labels nav nav-tabs">
              <li style={{ width: "25%" }} className="col-xs-12 active">
              </li>
            </ul>
            <div className="progress">
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
                aria-valuenow={1}
                aria-valuemin={1}
                aria-valuemax={5}
                style={{ width: "100%" }}
              >
                {" "}
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade in active" id="create-assignment">

              {
                role != "FACULTY" ? <h1></h1> :

                  <section>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor="name--first">
                            {" "}
                            Budget Head<span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control input-sm"
                            id="name__first"
                            value={budgetHead}
                            onChange={(e) => setBudgetHead(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* / end col */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor="name--last">
                            Sanctioned Budget<span className="required">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control input-sm"
                            id="name__last"
                            value={sanctionedBudget}
                            onChange={(e) => setSanctionedBudget(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* / end col */}
                      {/* Add and delete new items for purchase  */}
                      <div className="row ">
                        <div className="col-sm-4 ">
                          <div className="">
                            <label
                              className="control-label ml-4 "
                              htmlFor="name--last"
                            >
                              Description<span className="required">*</span>
                            </label>
                            <input
                              className="form-control input-sm add-button-input"
                              type="text"
                              placeholder="Item Description"
                              value={itemDescription}
                              onChange={(e) => setItemDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <label
                            className="control-label ml-4"
                            htmlFor="name--last"
                          >
                            Quantity<span className="required">*</span>
                          </label>
                          <input
                            className="form-control input-sm add-button-input"
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                          />
                        </div>
                        <div className="col-sm-2">
                          <label
                            className="control-label ml-4"
                            htmlFor="name--last"
                          >
                            Price<span className="required">*</span>
                          </label>
                          <input
                            className="form-control input-sm add-button-input"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                          />
                        </div>
                        <div className="col-sm-2">
                          <label
                            className="control-label ml-4"
                            htmlFor="name--last"
                          >
                            Tax Rate<span className="required">*</span>
                          </label>
                          <input
                            className="form-control input-sm add-button-input"
                            type="number"
                            placeholder="Tax Rate in %"
                            value={tax}
                            onChange={(e) => setTax(parseFloat(e.target.value))}
                          />
                        </div>

                        <Button
                          className="ml-11 mt-11 font-figtree text-lg bg-blue-700"
                          onClick={editingIndex !== null ? updateItem : addItem}
                        >
                          {editingIndex !== null ? "Update Item" : "Add Item"}
                        </Button>

                        <ul className="">
                          {items.map((item, index) => (
                            <li key={index}>
                              <div className="bg-red ml-4 mt-4 ">
                                <div className="col-sm-4 shadow mt-2">
                                  Item Description: {item.itemDescription}
                                </div>
                                <div className="col-sm-2 mt-2 ml-2 shadow">
                                  Quantity: {item.quantity}
                                </div>
                                <div className="col-sm-2 mt-2 shadow">
                                  Price: {item.price}
                                </div>
                                <div className="col-sm-2 mt-2 shadow">
                                  tax: {item.tax}
                                </div>
                              </div>
                              {/* Buttons for modifying and deleting items */}
                              <Button
                                className="ml-8 bg-green-500 font-figtree text-lg"
                                onClick={() => editItem(index)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="ml-2 bg-red-500 font-figtree text-lg"
                                onClick={() => deleteItem(index)}
                              >
                                Delete
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor="name--first">
                            {" "}
                            Approx Cost:<span className="required">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control input-sm"
                            id="name__first--kana"
                            value={approxCost}
                            onChange={(e) => setApproxCost(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor="">
                            Category:
                          </label>
                          <select className="form-control input-sm" id="category"
                            onChange={(event) => setCategory(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="LTA">LTA</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Non-Consumable">Npn-Consumable</option>
                          </select>
                        </div>
                      </div>

                      <div className="">
                        <div className="my-2 mx-4">
                          Budgetary Approval Enclosed
                          <select
                            className="form-control mt-2 input-sm"
                            id="email-type"
                            onChange={(event) => setBudgetaryApprovalEnclosed(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="">
                        <div className="my-2 mx-4">
                          Certified that the space is ready for installation of the
                          equipment in Department/Centre/Unit on its arrival:-
                          <select
                            className="form-control mt-2 input-sm"
                            id="email-type"
                            onChange={(event) => setReadyForInstallation(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="NA">NA</option>
                          </select>
                        </div>
                      </div>

                      <div className="">
                        <div className="my-2 mx-4">
                          If required for Research Purpose then Certificate for
                          claiming concessional GST under notification no. 45/2017 &
                          47/2017: Certified that purchase of above goods for which
                          concessional GST is claimed is required for research
                          purpose only.
                          <select
                            className="form-control mt-2 input-sm"
                            id="email-type"
                            onChange={(event) => setGoodForResearchPurpose(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>

                      {/* Gem purchase */}
                      <div className="">
                        <div className="my-2 mx-4">
                          GeM Purchase:
                          <select
                            className="form-control mt-2 input-sm"
                            id="email-type"
                            onChange={(event) => setGEM(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>

                          </select>
                        </div>
                      </div>

                      {
                        (GEM == "No") &&
                        (<>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="control-label" htmlFor="name--last">
                                GeMAR Details<span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control input-sm"
                                id="name__last"
                                value={gemarDetails}
                                onChange={(e) => setGemarDetails(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-group">
                              <label className="control-label" htmlFor="name--last">
                                PTS ID<span className="required">*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control input-sm"
                                id="name__last"
                                value={ptsId}
                                onChange={(e) => setPtsId(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="form-group">
                              <label className="control-label" htmlFor="name--last">
                                Attach PDF<span className="required">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control input-sm"
                                accept="application/pdf"
                                onChange={handleFileInput}
                              />
                            </div>
                          </div>
                        </>)
                      }

                      <div className="">
                        <div className="my-2 mx-4">
                          Mode of Enquiry:
                          <select
                            className="form-control mt-2 input-sm"
                            id="email-type"
                            onChange={(event) => setModeOfEnquiry(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="Telephone">Telephone</option>
                            <option value="Spot Visit">Spot Visit</option>
                            <option value="Vendor's Website">Vendor's Website</option>
                            <option value="E-mail">E-mail</option>
                            <option value="GeM">GeM</option>

                          </select>
                        </div>
                      </div>

                      <div className="mx-4 my-2 mt-2 flex">
                        <div className="quotation ">
                          Number of quotations received :
                        </div>
                        <input
                          onChange={(e) => setNumberOfQuotation(e.target.value)}
                          className="input-sm form-control " type="number" />
                      </div>
                      <div className="mx-4 my-2 mt-2 flex">
                        <div className="quotation ">Name of the supplier :</div>
                        <input className="input-sm form-control "
                          type="text"
                          onChange={(e) => setNameOfSupplier(e.target.value)}
                        />
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor="email">
                            Quotation Number
                          </label>
                          <input
                            type="text"
                            className="form-control input-sm"
                            id="email"
                            onChange={(e) => setQuotationNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* / end col */}

                      {/* / end col */}
                      <div className="col-sm-2">
                        <div className="form-group">
                          <label className="control-label" htmlFor="phone">
                            Date
                          </label>
                          <input
                            type="date"
                            className="form-control input-sm"
                            id="phone"
                            onChange={handleDateChange}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label modeOfPayment" htmlFor="">
                            Recommended Mode of Payment:
                          </label>
                          <select className="form-control input-sm" id="category"
                            onChange={(event) => setModeOfPayment(event.target.value)}
                          >
                            <option value="" disabled selected>-- Select --</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-left"></div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor="dob">
                            Delivery Period
                          </label>
                          <input
                            type="text"
                            className="js-single-daterange form-control input-sm"
                            onChange={(e) => setDeliveryPeriod(e.target.value)}
                            id="dob"
                          />
                        </div>
                      </div>

                    </div>
                  </section>
              }

              {department == "BUDGET" ?
                <div>
                  <div className="container-formsp101 mt-20 h-screen">
                    <div className="wizard" id="myWizard">
                      <section>
                        <h4 className="page-title text-center font-semibold font-figtree">
                          FOR USE BY BUDGET SECTION
                        </h4>
                      </section>
                      <div className="wizard__progress">
                        <ul className="wizard__labels nav nav-tabs">
                          <li style={{ width: "25%" }} className="col-xs-12 active">

                          </li>
                        </ul>
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={1}
                            aria-valuemax={5}
                            style={{ width: "100%" }}
                          >
                            {" "}
                          </div>
                        </div>
                      </div>
                      <div className="tab-content">
                        <div className="tab-pane fade in active" id="create-assignment">
                          <section>
                            <div className="row">
                              <div className="col-sm-12">
                                {/* budget head */}
                                <div className="form-group">
                                  <label className="font-normal" htmlFor="name--first" style={{ width: "167px" }}>
                                    {" "}
                                    Budget Head<span className="required">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control input-sm"
                                    id="name__first"
                                    value={budgetHead}
                                    onChange={(e) => setBudgetHead(e.target.value)}
                                  />
                                </div>
                              </div>
                              {/* /  Sanctioned Budget */}
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label className="font-normal" htmlFor="name--last" style={{ width: "167px" }}>
                                    Budget Sanctioned <span className="required">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control input-sm"
                                    id="name__last"
                                    value={sanctionedBudget}
                                    onChange={(e) => setSanctionedBudget(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label className="font-normal" htmlFor="name--last" style={{ width: "167px" }}>
                                    Budget Available <span className="required">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control input-sm"
                                    id="name__last"
                                    value={budgetAvailable}
                                    onChange={(e) => setBudgetAvailable(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label className="font-normal" htmlFor="name--last" style={{ width: "167px" }}>
                                    Budget Booked <span className="required">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control input-sm"
                                    id="name__last"
                                    value={budgetBooked}
                                    onChange={(e) => setBudgetBooked(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label className="font-normal" htmlFor="name--last" style={{ width: "167px" }}>
                                    Balance Budget <span className="required">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control input-sm"
                                    id="name__last"
                                    value={balanceBudget}
                                    onChange={(e) => setBalanceBudget(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> :
                <h1></h1>
              }


              {/* //purchase section */}
              {department == "PURCHASE" ?
                <div>
                  <div className="container-formsp101 mt-10 h-screen">
                    <div className="wizard" id="myWizard">
                      <section>
                        <h4 className="page-title text-center font-semibold font-figtree">
                          FOR USE BY PURCHASE SECTION
                        </h4>
                      </section>
                      <div className="wizard__progress">
                        <ul className="wizard__labels nav nav-tabs">
                          <li style={{ width: "25%" }} className="col-xs-12 active">

                          </li>
                        </ul>
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={1}
                            aria-valuemax={5}
                            style={{ width: "100%" }}
                          >
                            {" "}
                          </div>
                        </div>
                      </div>
                      <div className="tab-content container-purchase">
                        <div className="tab-pane fade in active" id="create-assignment">
                          <section>
                            <div className="row">
                              <div className="col-sm-12">
                                {/* budget head */}
                                <div className="form-group">
                                  <div
                                    className="control-label-1 mb-0"
                                    htmlFor="name--first"
                                  >
                                    {" "}
                                    Quotation signed by all the committee members.
                                    Calculations indicated above have been checked and found
                                    in order.
                                  </div>
                                </div>
                              </div>
                              {/* /   */}
                              <div className="control-label-1 ml-6" htmlFor="name--first">
                                {" "}
                                Purchase proposal <label className="label-purchase " > from Page Number </label>
                                <input
                                  type="number"
                                  className="form input-sm"
                                  id="name__last"
                                  value={startPageNo}
                                  onChange={(e) => setStartPageNo(e.target.value)}
                                />
                                <label className="label-purchase ml-2">to Page Number</label>
                                <input
                                  type="number"
                                  className="form input-sm mr-3 "
                                  id="name__last"
                                  value={endPageNo}
                                  onChange={(e) => setEndPageNo(e.target.value)}
                                />
                                is in order.
                              </div>

                              <div className="control-label-1 ml-6" htmlFor="name--first">
                                {" "}
                                The Competent Financial Authority (CFA) may kindly
                                accord financial sanction to the extent of  <label> Rs. </label>
                                <input
                                  type="number"
                                  className="form input-sm"
                                  id="name__last"
                                  value={rsInValue}
                                  onChange={(e) => setRsInValue(e.target.value)}
                                />
                                <label className="ml-2">in words</label>
                                <input
                                  type="text"
                                  className="form input-sm mr-3 "
                                  id="name__last"
                                  value={rsInWords}
                                  onChange={(e) => setRsInWords(e.target.value)}
                                />
                                only for the above purchase
                              </div>
                            </div>


                            <div>

                              <label className="label-purchase">Enter FILE NUMBER</label>
                              <input
                                type="text"
                                className="form input-sm mr-3 "
                                id="name__last"
                                value={rsInWords}
                                onChange={(e) => setRsInWords(e.target.value)}
                              />
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> :
                <h1></h1>
              }


              {/* <div className={hasClass ? 'container-popup' : ''} >
                <div className={hasClass ? 'popup-open' : 'popup'}>

                  <h2 className="popup-content">Send Form to HOD (by default) else Enter the email of the Person concerned </h2>
                  Send form to  :
                  <input
                    type="text"
                    className="form input-sm ml-3 "
                    id="name__last"
                    placeholder="HOD"
                    value={sendFormTo}
                    onChange={(e) => setSendFormTo(e.target.value)}
                  />

                  <Button
                    type="button"
                    className="bg-green-500 text-lg hover:bg-green-700"
                    loading={loading}
                    onClick={handlePopup}
                  >
                    Submit
                  </Button>
                </div>
              </div> */}
              <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader fontSize={"medium"}>Forward Form for Approval</ModalHeader>
                  <ModalCloseButton size={"md"} />
                  <ModalBody>
                    <p>
                      Specify the email address to forward the form for approval. By default, it is sent to the Head of Department (HOD). You can change it if necessary.
                    </p>
                    <Input
                      fontSize={"base"}
                      mt={2}
                      border={"1px solid #E2E8F0"}
                      value={sendFormTo}
                      onChange={(e) => setSendFormTo(e.target.value)}
                      placeholder="hod@iitrpr.ac.in"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="bg-green-500 font-figtree text-base hover:bg-green-700"
                      onClick={handlePopup}
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <section className="flex justify-end -mt-60">
                <Button
                  type="button"
                  className="bg-green-500 text-lg hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>)}
      <ToastContainer />
    </div>
  );
};



export default Form_sp101;
