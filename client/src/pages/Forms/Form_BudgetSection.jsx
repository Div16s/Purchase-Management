import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form_sp101.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextFormSP101Data from "../../Context/ContextFormSP101Data";
import SP_101 from './SP_101';
import './Form_Budget.css';
import { submitBudgetSectionForm } from "../../services/Apis";
import { Button } from "@material-tailwind/react";

const Form_BudgetSection = () => {
  // Define state for items and input values
  const [budgetHead, setBudgetHead] = useState(null);
  const [sanctionedBudget, setSanctionedBudget] = useState(null);
  const [budgetAvailable, SetBudgetAvailable] = useState(null);
  const [budgetBooked, setBudgetBooked] = useState(null);
  const [balanceBudget, setBalanceBudget] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const { formData, setFormData } = useContext(ContextFormSP101Data);

  //function for handling downloading pdf form
  const handleDownloadPDF = (e) => {
    e.preventDefault();

    //error handling 
    if (budgetHead === null || sanctionedBudget === null) {
      toast.error("All fields are required."); return;
    }
    setFormData({
     
  

    });
  }

//   useEffect(() => {
//     if (formData) {
//       SP_101({ formData });
//     }
//   }, [formData]);

//   //function for handling submit click
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if(isValid){
      setLoading(true);
      try {
        const inputData = {
          budgetHead,
          sanctionedBudget,
          budgetAvailable,
          budgetBooked,
          balanceBudget,
        }

        const response = await submitBudgetSectionForm(inputData);
        if(response.status === 200){
          toast.success("Form submitted successfully");
          navigate("/dashboard");
        }
        else{
          toast.error(response.response.data.err);
        }
      } catch (error) {
        toast.error(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    console.log("Handle Submit is clicked");
  }

  const validateForm = () => {
    let isValid = true;
  
    if (budgetHead === "" ||budgetHead === null ) {
      toast.error("Enter Budget Head");
      isValid = false;
    } else if (sanctionedBudget === "" ||sanctionedBudget === null ) {
      toast.error("Enter Sanctioned Budget");
      isValid = false;
    } else if (budgetAvailable === "") {
      toast.error("Enter Available Budget");
      isValid = false;
    } else if (budgetBooked === "" ||budgetBooked === null ) {
      toast.error("Enter Budget Booked");
      isValid = false;
    } else if (balanceBudget === "" ||balanceBudget === null ) {
      toast.error("Enter Budget Balance");
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
              For Use by Budget Section
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
                      <label className="" htmlFor="name--last"  style={{ width: "167px" }}>
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
              
              <section className="text-right">
                {/* <button
                  type="button"
                  className="bg-blue-500 text-white btn-sm hover:bg-blue-700 next"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button> */}
                <Button
                  type="button"
                  className="bg-green-500 text-lg hover:bg-green-700"
                  style={{position: "relative",overflow: "hidden",bottom: "40px"}}
                  loading={loading}
                  onClick={handleSubmit}
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

export default Form_BudgetSection;
