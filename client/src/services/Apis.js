import { commonRequest } from "./ApiCall";
const BACKEND_URL = "http://172.30.8.218:5000"

export const sendOTP_register = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/users/signup`,data);
}

export const registerUser = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/users/verifyOTP_signup`,data);
}

export const sendOTP = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/users/login`,data);
}

export const verifyUser = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/users/verifyOTP_login`,data);
}

export const updateUser = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/users/update`,data, header);
}

export const submitFormSP101 = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/submitSP101`,data, header);
}

export const withdrawFormRequest = async (data, header) => {
    return await commonRequest("POST", `${BACKEND_URL}/forms/withdraw`,data,header);
}

//pending forms
export const pendingForms = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending`,data, header);
}

export const pendingFormsAdmin = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending/Admin`,data, header);
}

export const pendingFormsHOD = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending/HOD`,data, header);
}

export const pendingFormsAccountSection = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending/AccountSection`,data, header);
}

export const pendingFormsPurchaseSection = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending/PurchaseSection`,data, header);
}

export const pendingFormsRegistrar = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending/Registrar`,data, header);
}

// approved forms
export const approvedForms = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved`,data, header);
}

export const approvedFormsHOD = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved/HOD`,data, header);
}

export const approvedFormsAccountSection = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved/AccountSection`,data, header);
}

export const approvedFormsPurchaseSection = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved/PurchaseSection`,data, header);
}

export const approvedFormsRegistrar = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved/Registrar`,data, header);
}

// approve form request
export const approveFormRequest = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approve`,data,header);
}

export const approveFormAccountSectionRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approve/AccountSection`,data,header);
}

export const approveFormPurchaseSectionRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approve/PurchaseSection`,data,header);
}

export const approveFormRegistrarRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approve/Registrar`,data,header);
}

// reject form request
export const rejectFormHODRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/reject/HOD`,data,header);
}

export const rejectFormAccountSectionRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/reject/AccountSection`,data,header);
}

export const rejectFormPurchaseSectionRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/reject/PurchaseSection`,data,header);
}

export const rejectFormRegistrarRequest = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/reject/Registrar`,data,header);
}

// rejected forms
export const rejectedFormsUser = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/rejected`,data, header);
}

export const rejectedFormsHOD = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/rejected/HOD`,data, header);
}

export const rejectedFormsAccountSection = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/rejected/AccountSection`,data, header);
}

export const rejectedFormsPurchaseSection = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/rejected/PurchaseSection`,data, header);
}

export const rejectedFormsRegistrar = async (data, header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/rejected/Registrar`,data, header);
}


// get form by id
export const getFormById = async (data,header) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/getFormById`,data,header);
}