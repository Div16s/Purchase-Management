import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Forms/Form_sp101.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextFormSP101Data from "../../Context/ContextFormSP101Data";
import SP_101 from '../Forms/SP_101';
import { approveFormAccountSectionRequest, approveFormPurchaseSectionRequest, getFormById } from "../../services/Apis";
import { Button } from "@material-tailwind/react";
import useShowToast from "../../hooks/useShowToast";

const EditApproveForm = () => {
    let { form_id } = useParams();
    form_id = parseInt(form_id);

    //purchase section
    const [startPageNo, setStartPageNo] = useState(null);
    const [endPageNo, setEndPageNo] = useState(null);
    const [rsInValue, setRsInValue] = useState(null);
    const [rsInWords, setRsInWords] = useState(null);
    const [fileNo, setFileNo] = useState(null);
    //budget section
    const [budgetAvailable, setBudgetAvailable] = useState(null);
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
    const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited
    const [category, setCategory] = useState("");
    const [budgetaryApprovalEnclosed, setBudgetaryApprovalEnclosed] = useState("")
    const [readyForInstallation, setReadyForInstallation] = useState("")
    const [goodForResearchPurpose, setGoodForResearchPurpose] = useState("")
    const [GEM, setGEM] = useState("")
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
    const signatureFile = JSON.parse(localStorage.getItem("userInfo")).signatureFile;
    const department = JSON.parse(localStorage.getItem("userInfo")).department;
    const role = JSON.parse(localStorage.getItem("userInfo")).role;
    const adminSignature = JSON.parse(localStorage.getItem("userInfo")).signatureFile || "";
    const jwtToken = JSON.parse(localStorage.getItem("userInfo")).userToken;
    const [approvedBy, setApprovedBy] = useState("");
    const navigate = useNavigate();
    const showToast = useShowToast();

    const { formData, setFormData } = useContext(ContextFormSP101Data);

    const handleDateChange = (e) => {
        const inputValue = e.target.value;

        // Split the date string by '-' delimiter
        const parts = inputValue.split('-');

        //Rearranging the parts to format the date as day/month/year
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        //Setting the formatted date in the state
        setDate(formattedDate);
    };

    // Function to convert date format from "dd/mm/yyyy" to "yyyy-mm-dd"
    const convertDateFormat = (dateString) => {
        const parts = dateString.split('/');
        // Rearrange the parts to yyyy-mm-dd format
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    //function for handling downloading pdf form
    const handleDownloadPDF = (e) => {
        e.preventDefault();

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
            numberOfQuotation,
            quotationNumber,
            date,
            modeOfPayment,
            deliveryPeriod, budgetAvailable, budgetBooked, balanceBudget,
        });
    }

    useEffect(() => {
        if (signatureFile && formData) {
            SP_101({ formData });
        }
    }, [formData]);

    useEffect(() => {
        const fetchFormById = async () => {
            try {
                const data = { form_id, role, department };
                const header = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                };
                const response = await getFormById(data, header);
                if (response.status === 200) {
                    const form = response.data;
                    console.log("Form: ", form);
                    setApprovedBy(form.approvedBy);
                    setBudgetHead(form.budgetHead);
                    setSanctionedBudget(form.sanctionedBudget);
                    setApproxCost(form.approxCost);
                    setItems(form.items);
                    setCategory(form.category);
                    setBudgetaryApprovalEnclosed(form.budgetaryApprovalEnclosed);
                    setReadyForInstallation(form.readyForInstallation);
                    setGoodForResearchPurpose(form.goodForResearchPurpose);
                    setGEM(form.GEM);
                    setGemarDetails(form.gemarDetails);
                    setPtsId(form.ptsId);
                    setModeOfEnquiry(form.modeOfEnquiry);
                    setNameOfSupplier(form.nameOfSupplier);
                    setNumberOfQuotation(form.numberOfQuotation);
                    setQuotationNumber(form.quotationNumber);
                    setDate(convertDateFormat(form.date));
                    setModeOfPayment(form.modeOfPayment);
                    setDeliveryPeriod(form.deliveryPeriod);

                    { form.budgetSection && setBudgetAvailable(form.budgetSection.budgetAvailable) }
                    { form.budgetSection && setBudgetBooked(form.budgetSection.budgetBooked) }
                    { form.budgetSection && setBalanceBudget(form.budgetSection.balanceBudget) }

                    { form.purchaseSection && setStartPageNo(form.purchaseSection.startPageNo) }
                    { form.purchaseSection && setEndPageNo(form.purchaseSection.endPageNo) }
                    { form.purchaseSection && setRsInValue(form.purchaseSection.rsInValue) }
                    { form.purchaseSection && setRsInWords(form.purchaseSection.rsInWords) }

                }
                else {
                    toast.error(response.data.err);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchFormById();
    }, [form_id])

    //function for handling submit click
    const handleApproveAccountSection = async (e) => {
        e.preventDefault();
        if(adminSignature === ""){
            toast.error("Please upload the signature first.")
            return;
        }
        // const isValid = validateForm();
        setLoading(true);
        try {
            const inputData = {
                form_id,
                role,
                department,
                adminSignature,
                budgetAvailable,
                budgetBooked,
                balanceBudget
            }
            const header = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            };

            const response = await approveFormAccountSectionRequest(inputData, header);
            if (response.status === 200) {
                const successMessage = response.data.message;
                showToast("Approved", successMessage, 'success');
                navigate("/approvedForms");
            } else {
                toast.error(response.response.data.err);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleApprovePurchaseSection = async (e) => {
        e.preventDefault();
        if(adminSignature === ""){
            toast.error("Please upload the signature first.")
            return;
        }
        // const isValid = validateForm();
        setLoading(true);
        try {
            const inputData = {
                form_id,
                role,
                department,
                adminSignature: signatureFile,
                startPageNo,
                endPageNo,
                rsInValue,
                rsInWords,
                fileNo
            }
            const header = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
            };
            const response = await approveFormPurchaseSectionRequest(inputData, header);
            if (response.status === 200) {
                const successMessage = response.data.message;
                showToast("Approved", successMessage, 'success');
                navigate("/approvedForms");
            } else {
                toast.error(response.response.data.err);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    // Function to handle adding new item
    const addItem = () => {
        const newItem = {
            itemDescription: itemDescription,
            quantity: quantity,
            price: price,
        };

        if (!itemDescription || !quantity || !price) {
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
    };

    // Function to handle editing an item
    const editItem = (index) => {
        // Set input values to values of item being edited
        setItemDescription(items[index].itemDescription);
        setQuantity(items[index].quantity);
        setPrice(items[index].price);
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
        if (!itemDescription || !quantity || !price) {
            toast.error("All fields are required.");
            return;
        }
        const updatedItems = [...items];
        updatedItems[editingIndex] = {
            itemDescription: itemDescription,
            quantity: quantity,
            price: price,
        };
        setItems(updatedItems);
        // Reset input values and editingIndex
        setItemDescription("");
        setQuantity(0);
        setPrice(0);
        setEditingIndex(null);
    };

    // Function to validate the form
    const validateForm = () => {
        let isValid = true;
        return isValid;
    };

    return (
        <div>
            {(department !== "ACC" && department !== "PUR") && (
                <div className="container-formsp101 mt-24">
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
                                                    value={category}
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
                                                    value={budgetaryApprovalEnclosed}
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
                                                    value={readyForInstallation}
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
                                                    value={goodForResearchPurpose}
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
                                                    value={GEM}
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
                                                <div className="col-sm-6">
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
                                            </>)
                                        }

                                        <div className="">
                                            <div className="my-2 mx-4">
                                                Mode of Enquiry:
                                                <select
                                                    className="form-control mt-2 input-sm"
                                                    id="email-type"
                                                    value={modeOfEnquiry}
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
                                            <input value={numberOfQuotation}
                                                onChange={(e) => setNumberOfQuotation(e.target.value)}
                                                className="input-sm form-control " type="number" />
                                        </div>
                                        <div className="mx-4 my-2 mt-2 flex">
                                            <div className="quotation ">Name of the supplier :</div>
                                            <input className="input-sm form-control "
                                                type="text"
                                                value={nameOfSupplier}
                                                onChange={(e) => setNameOfSupplier(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="email">
                                                    Quotation Number
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control input-sm"
                                                    id="email"
                                                    value={quotationNumber}
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
                                                    value={date}
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
                                                    value={modeOfPayment}
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
                                                    value={deliveryPeriod}
                                                    onChange={(e) => setDeliveryPeriod(e.target.value)}
                                                    id="dob"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            )}


            {department === "ACC" && (
                <div>
                    <div className="container-formsp101 mt-20">
                        <div className="wizard" id="myWizard">
                            <section>
                                <h4 className="page-title text-center font-bold font-figtree">
                                    FOR USE BY BUDGET SECTION
                                </h4>
                            </section>
                            <div className="wizard__progress">
                                <ul className="wizard__labels nav nav-tabs">
                                    <li style={{ width: "25%" }} className="col-xs-12 active">
                                        {/* <a href="#create-assignment" data-toggle="tab" data-step={1}>
            <i className="fa fa-folder-open wizard__icon" /> Create Assignment
          </a> */}
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
                                                    <label className="" htmlFor="name--first" style={{ width: "167px" }}>
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
                                                    <label className="" htmlFor="name--last" style={{ width: "167px" }}>
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
                                                    <label className="" htmlFor="name--last" style={{ width: "167px" }}>
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
                                                    <label className="" htmlFor="name--last" style={{ width: "167px" }}>
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
                                                    <label className="" htmlFor="name--last" style={{ width: "167px" }}>
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
                                    {/* buttons */}
                                    <section className="text-right flex items-center">
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>

            )}


            {department === "PUR" && (
                <div className="h-screen">
                    <div className="container-formsp101 mt-10 -mb-80">
                        <div className="wizard" id="myWizard">
                            <section>
                                <h4 className="page-title text-center font-bold font-figtree">
                                    FOR USE BY PURCHASE SECTION
                                </h4>
                            </section>
                            <div className="wizard__progress">
                                <ul className="wizard__labels nav nav-tabs">
                                    <li style={{ width: "25%" }} className="col-xs-12 active">
                                        {/* <a href="#create-assignment" data-toggle="tab" data-step={1}>
            <i className="fa fa-folder-open wizard__icon" /> Create Assignment
          </a> */}
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
                                                Purchase proposal <label className="label-purchase" > from Page Number </label>
                                                <input
                                                    type="number"
                                                    className="form input-sm"
                                                    id="name__last"
                                                    value={startPageNo}
                                                    onChange={(e) => setStartPageNo(e.target.value)}
                                                />
                                                <label className="label-purchase ml-3" >to Page Number</label>
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
                                                <label className="ml-3">in words</label>
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
                                                value={fileNo}
                                                onChange={(e) => setFileNo(e.target.value)}
                                            />
                                        </div>
                                    </section>
                                    {/* buttons */}
                                    <section className="text-right grid ">
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}

            {department === "ACC" && (
                <section className="flex justify-end">
                    <Button
                        type="button"
                        className=" -mt-16 bg-green-500 text-lg hover:bg-green-700"
                        loading={loading}
                        onClick={department === "ACC" ? handleApproveAccountSection : handleApprovePurchaseSection}
                    >
                        Approve
                    </Button>
                </section>
            )}
            {department === "PUR" && (
                <section className=" mr-50 -mt-96 flex justify-end">
                    <Button
                        type="button"
                        className="bg-green-500 text-lg  hover:bg-green-700"
                        loading={loading}
                        onClick={department === "ACC" ? handleApproveAccountSection : handleApprovePurchaseSection}
                    >
                        Approve
                    </Button>
                </section>
            )}
            <ToastContainer />
        </div>
    )
}

export default EditApproveForm