import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form_sp101.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextFormSP101Data from "../../Context/ContextFormSP101Data";
import SP_101 from "./SP_101";
import "./Form_Purchase.css";
import { Button } from "@material-tailwind/react";

const Form_PurchaseSection = () => {
  // Define state for items and input values
  const [startPageNo, setStartPageNo] = useState(null);
  const [endPageNo, setEndPageNo] = useState(null);
  const [rsInValue, setRsInValue] = useState(null);
  const [rsInWords, setRsInWords] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { formData, setFormData } = useContext(ContextFormSP101Data);

  //function for handling downloading pdf form
  const handleDownloadPDF = (e) => {
    e.preventDefault();

    //error handling

    setFormData({
      startPageNo, endPageNo, rsInValue, rsInWords
    });
  };

  //   useEffect(() => {
  //     if (formData) {
  //       SP_101({ formData });
  //     }
  //   }, [formData]);

  //   //function for handling submit click
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      try {
        const inputData = {
          startPageNo,
          endPageNo,
          rsInValue,
          rsInWords,
        };
        const response = await submitPurchaseSectionForm(inputData);
        if (response.status === 200) {
          toast.success("Form submitted successfully");
          navigate("/dashboard");
        }
        else {
          toast.error(response.response.data.err);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
      console.log("Handle Submit is clicked");
    };
  };

  const validateForm = () => {
    let isValid = true;
    if (startPageNo === "") {
      toast.error("Enter starting Page Number");
      isValid = false;
    } else if (endPageNo === "") {
      toast.error("Enter Ending Page Number");
      isValid = false;
    } else if (rsInValue === "") {
      toast.error("Enter Rs in value");
      isValid = false;
    } else if (rsInWords === "") {
      toast.error("Enter Rs in Words");
      isValid = false;
    } else if (startPageNo === "") {
      toast.error("Enter starting Page Number");
      isValid = false;
    }

    return isValid;
  };
  return (
    <div>
      <div className="container-formsp101 mt-20 h-screen">
        <div className="wizard" id="myWizard">
          <section>
            <h4 className="page-title text-center">
              For Use by Purchase Section
            </h4>
          </section>
          <div className="wizard__progress">
            <ul className="wizard__labels nav nav-tabs">
              <li style={{ width: "25%" }} className="col-xs-12 active">
                {/* <a href="#create-assignment" data-toggle="tab" data-step={1}>
            <i className="fa fa-folder-open wizard__icon" /> Create Assignment
          </a> */}
              </li>
              {/* <li style={{ width: "25%" }} className="col-xs-12 ">
          <a href="#associate-info" data-toggle="tab" data-step={2}>
            <i className="fa fa-user wizard__icon" /> Associate Info
          </a>
        </li>
        <li style={{ width: "25%" }} className="col-xs-12 ">
          <a href="#working-conditions" data-toggle="tab" data-step={3}>
            <i className="fa fa-file-text-o wizard__icon" /> Working Conditions
          </a>
        </li>
        <li style={{ width: "25%" }} className="col-xs-12 " id="lastli">
          <a href="#validate" data-toggle="tab" data-step={4}>
            <i className="fa fa-check wizard__icon" /> Validate
          </a>
        </li> */}
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
                    Purchase proposal <label> from Page Number </label>
                    <input
                      type="number"
                      className="form input-sm"
                      id="name__last"
                      value={startPageNo}
                      onChange={(e) => setStartPageNo(e.target.value)}
                    />
                    <label>to Page Number</label>
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
                    <label>in words</label>
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
              </section>

              {/* buttons */}

              <section className="text-right grid ">
                {/* <button
                  type="button"
                  className="bg-blue-500 text-white btn-sm hover:bg-blue-700 next"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button> */}
                <Button
                  type="button"
                  size="lg"
                  className="bg-green-500 justify-self-end font-bold text-lg text-white hover:bg-green-700 pl-6 pr-6 next"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Submit
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form_PurchaseSection;
