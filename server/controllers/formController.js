import prisma from '../db/dbConfig.js'
import multer from 'multer';

// const upload = multer({ dest: 'uploads/' });

const submitFormSP101 = async (req, res) => {
    const { userName, userId, role, department, sendFormTo, formCategory, budgetHead, sanctionedBudget, approxCost, items, category, budgetaryApprovalEnclosed,
        readyForInstallation, goodForResearchPurpose, GEM, GEM_PDF, modeOfEnquiry, nameOfSupplier, numberOfQuotation,
        quotationNumber, date, modeOfPayment, deliveryPeriod }
        = req.body;

    const signatureFile = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            signature: true
        }
    });

    const signature = signatureFile.signature.toString();

    try {
        let sendTo = "";
        if (sendFormTo.includes("@")) {
            sendTo = await prisma.user.findFirst({
                where: {
                    email: sendFormTo
                }
            });

            if (!sendTo) {
                res.status(404).json({
                    err: "Person not found with the given email address",
                });
                return;
            }
        }
        
        let gemPdfPath = "";
        if (GEM_PDF) { // If a file was uploaded
            gemPdfPath = GEM_PDF.title; // Path to the uploaded PDF
        }
        console.log("GEM PDF PATH: ",gemPdfPath);
        await prisma.form.create({
            data: {
                userId,
                name: userName,
                department,
                signatures: {
                    create: { // Create a new signature for the user
                        signature: signature,
                        role: role,
                        department: department
                    }
                },
                formCategory,
                sendTo: sendTo ? sendTo.email : "",
                budgetHead,
                sanctionedBudget,
                approxCost,
                items: {
                    create: items.map(item => ({
                        itemDescription: item.itemDescription,
                        quantity: item.quantity,
                        price: item.price,
                        tax: item.tax
                    }))
                },
                category,
                budgetaryApprovalEnclosed,
                readyForInstallation,
                goodForResearchPurpose,
                GEM,
                GEM_PDF: gemPdfPath,
                modeOfEnquiry,
                nameOfSupplier,
                numberOfQuotation,
                quotationNumber,
                date,
                modeOfPayment,
                deliveryPeriod
            },
            include: {
                items: true,
                signatures: true
            } // Include items in the response
        });

        res.status(200).json({
            message: "Form submitted successfully"
        });
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in submitForm: ", error.message);
    }
};

const withdrawForm = async (req, res) => {
    const { id } = req.body;
    const formID = parseInt(id);
    try {
        const deletedForm = await prisma.form.delete({
            where: {
                id: formID
            }
        });

        res.status(200).json({
            message: "Form withdrawn successfully"
        });
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in withdrawForm: ", error.message);
    }
}

// Controller for fetching pending forms of a user(faculty)
const pendingForms = async (req, res) => {
    const { userId } = req.body;
    const id = parseInt(userId);

    try {
        const forms = await prisma.form.findMany({
            where: {
                userId: id,
                status: "PENDING"
            },
            include: {
                items: true, // Include the items related to each form
                signatures: true,
                budgetSection: true,
                purchaseSection: true
            }
        });

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingForms: ", error.message);
    }
}

const pendingFormsAdmin = async (req, res) => {
    const { department, email } = req.body;
    try {
        const forms = await prisma.form.findMany({
            where: {
                AND: [
                    { status: "PENDING" }, // Ensure that status is "PENDING"
                    {
                        OR: [
                            { department },
                            { sendTo: { contains: email } },
                        ],
                    },
                    { approvedBy: "NONE" }, // Additional condition to match forms
                ],
            },
            include: {
                items: true,
                signatures: true,
            }
        });

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingForms: ", error.message);
    }
}

const pendingFormsHOD = async (req, res) => {
    const { department, email } = req.body;
    try {
        const forms = await prisma.form.findMany({
            where: {
                AND: [
                    { status: "PENDING" }, // Ensure that status is "PENDING"
                    {
                        OR: [
                            { department },
                            { sendTo: { contains: email } },
                        ],
                    },
                    {
                        approvedBy: {
                            not: "NONE",
                        }
                    },
                    {
                        rejectedBy: {
                            not: "HOD",
                        }
                    }
                ],
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingFormsHOD: ", error.message);
    }
}

const pendingFormsAccountSection = async (req, res) => {
    const { role } = req.body;
    let approvedByCondition = {};
    if (role === "JAO" || role === "ACCOUNTANT") {
        approvedByCondition = { approvedBy: "INITIAL_HOD" };
    }
    else if (role === "AO") {
        approvedByCondition = {
            OR: [
                { approvedBy: "ACCOUNTANT" },
                { approvedBy: "JAO" },
            ],
        };
    }
    else if (role === "DR" || role === "AR" || role === "JR") {
        approvedByCondition = { approvedBy: "AO" };
    }

    try {
        const forms = await prisma.form.findMany({
            where: {
                status: "PENDING",
                ...approvedByCondition,
                rejectedBy: "NONE",
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingFormsAccountSection: ", error.message);
    }
}

const pendingFormsPurchaseSection = async (req, res) => {
    const { role } = req.body;
    let approvedBy = "";
    if (role === "JS") {
        approvedBy = "ACCOUNTS";
    }
    else if (role === "AR" || role === "JR" || role === "DR") {
        approvedBy = "JS";
    }

    try {
        const forms = await prisma.form.findMany({
            where: {
                status: "PENDING",
                approvedBy: approvedBy,
                rejectedBy: "NONE",
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingFormsAccountSection: ", error.message);
    }
}

const pendingFormsRegistrar = async (req, res) => {
    try {
        const forms = await prisma.form.findMany({
            where: {
                status: "PENDING",
                approvedBy: "PURCHASE",
                rejectedBy: "NONE",
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingFormsRegistrar: ", error.message);
    }
}

const approveForm = async (req, res) => {
    const { formID, adminSignature, hasBeenApprovedBy, department } = req.body;
    let approvedBy = "";
    let status = "PENDING";
    if (hasBeenApprovedBy === "NONE") {
        approvedBy = "INITIAL_HOD";
    } else if (hasBeenApprovedBy === "REGISTRAR") {
        approvedBy = "FINAL_HOD";
        status = "APPROVED";
    }

    try {
        await prisma.form.update({
            where: {
                id: formID,
            },
            data: {
                approvedBy: approvedBy,
                status: status,
                ...(approvedBy === "FINAL_HOD" && ({
                    signatures: {
                        create: {
                            signature: adminSignature,
                            role: "HOD",
                            department: department
                        }
                    }
                })),
            }
        });

        res.status(200).json({
            message: "Form approved successfully"
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approveForm: ", error.message);
    }
}

// Controller for approving form by the account section
const approveFormAccountSection = async (req, res) => {
    const { form_id, role, department, adminSignature, budgetAvailable, budgetBooked, balanceBudget } = req.body;
    let approvedBy = "";
    if (role === "JAO") {
        approvedBy = "JAO";
    }
    else if (role === "ACCOUNTANT") {
        approvedBy = "ACCOUNTANT";
    }
    else if (role === "AO") {
        approvedBy = "AO";
    }
    else if (role === "AR" || role === "JR" || role === "DR") {
        approvedBy = "ACCOUNTS";
    }

    try {
        const isFormIdExists = await prisma.budgetSection.findFirst({
            where: {
                formId: form_id
            }
        });

        const formIDExists = await prisma.signature.findFirst({
            where: {
                formId: form_id,
                role: role,
                department: department
            }
        });
        const signatureData = formIDExists ? {
            update: {
                signature: adminSignature,
            }
        } : {
            create: {
                signature: adminSignature,
                role: role,
                department: department
            }
        };

        if (["JAO", "ACCOUNTANT"].includes(role)) {
            if (!isFormIdExists) {
                await prisma.budgetSection.create({
                    data: {
                        formId: form_id,
                        budgetAvailable: budgetAvailable,
                        budgetBooked: budgetBooked,
                        balanceBudget: balanceBudget,
                    },
                });
            }
            else {
                await prisma.budgetSection.update({
                    where: {
                        formId: form_id
                    },
                    data: {
                        budgetAvailable: budgetAvailable,
                        budgetBooked: budgetBooked,
                        balanceBudget: balanceBudget,
                    }
                });
            }
        }

        await prisma.form.update({
            where: {
                id: form_id
            },
            data: {
                approvedBy: approvedBy,
                ...(formIDExists ? {} : { signatures: { create: signatureData.create } }),
                // Only include the update block if formIDExists is true
                ...(formIDExists ? { signatures: { update: signatureData.update } } : {}),
            },
            include: {
                signatures: true,
            }
        });

        res.status(200).json({
            message: "Form approved successfully",
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approveFormAccountSection: ", error.message);
    }
}

// Controller for approving form by the purchase section
const approveFormPurchaseSection = async (req, res) => {
    const { form_id, role, department, adminSignature, startPageNo, endPageNo, rsInValue, rsInWords, fileNo } = req.body;
    let approvedBy = "";
    if (role === "JS") {
        approvedBy = "JS";
    }
    else if (role === "AR" || role === "JR" || role === "DR") {
        approvedBy = "PURCHASE";
    }

    try {
        const isFormIdExists = await prisma.purchaseSection.findFirst({
            where: {
                formId: form_id
            }
        });

        const formIDExists = await prisma.signature.findFirst({
            where: {
                formId: form_id,
                role: role,
                department: department
            }
        });
        const signatureData = formIDExists ? {
            update: {
                signature: adminSignature,
            }
        } : {
            create: {
                signature: adminSignature,
                role: role,
                department: department
            }
        };

        if (["JS"].includes(role)) {
            if (!isFormIdExists) {
                await prisma.purchaseSection.create({
                    data: {
                        formId: form_id,
                        startPageNo: startPageNo,
                        endPageNo: endPageNo,
                        rsInValue: rsInValue,
                        rsInWords: rsInWords,
                        fileNo: fileNo,
                    },
                });
            }
            else {
                await prisma.purchaseSection.update({
                    where: {
                        formId: form_id
                    },
                    data: {
                        startPageNo: startPageNo,
                        endPageNo: endPageNo,
                        rsInValue: rsInValue,
                        rsInWords: rsInWords,
                    }
                });
            }
        }

        await prisma.form.update({
            where: {
                id: form_id
            },
            data: {
                approvedBy: approvedBy,
                ...(formIDExists ? {} : { signatures: { create: signatureData.create } }),
                // Only include the update block if formIDExists is true
                ...(formIDExists ? { signatures: { update: signatureData.update } } : {}),
            },
            include: {
                signatures: true,
            }
        });

        res.status(200).json({
            message: "Form approved successfully",
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approveFormPurchaseSection: ", error.message);
    }
}

const approveFormRegistrar = async (req, res) => {
    const { formID, adminSignature } = req.body;
    const id = parseInt(formID);
    try {
        await prisma.form.update({
            where: {
                id: id
            },
            data: {
                approvedBy: "REGISTRAR",
                signatures: {
                    create: {
                        signature: adminSignature,
                        role: "REGISTRAR",
                    }
                }
            },
            include: {
                signatures: true,
            }
        });

        res.status(200).json({
            message: "Form approved successfully",
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approveFormRegistrar: ", error.message);
    }
}

// Controller for fetching approved forms of a user(faculty)
const approvedForms = async (req, res) => {
    const { userId } = req.body;
    const id = parseInt(userId);
    try {
        const forms = await prisma.form.findMany({
            where: {
                userId: id,
                status: "APPROVED"
            },
            include: {
                items: true, // Include the items related to each form
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedForms: ", error.message);
    }
}

const approvedFormsHOD = async (req, res) => {
    const { department, email } = req.body;
    try {
        const forms = await prisma.form.findMany({
            where: {
                AND: [
                    { status: "APPROVED" },
                    {
                        OR: [
                            { department: department },
                            { sendTo: { contains: email } },
                        ],
                    },
                ],
            },
            include: {
                items: true, // Include the items related to each form
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedForms: ", error.message);
    }
}

// Controller for getting approved forms by the account section
const approvedFormsAccountSection = async (req, res) => {
    const { role } = req.body;
    let approvedBy = role;
    if (role === "AR" || role === "JR" || role === "DR") {
        approvedBy = "ACCOUNTS";
    }

    try {
        const forms = await prisma.form.findMany({
            where: {
                approvedBy: approvedBy,
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true
            }
        })

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedFormsAccountSection: ", error.message);
    }
}

// Controller for approved forms by the purchase section
const approvedFormsPurchaseSection = async (req, res) => {
    const { role } = req.body;
    let approvedBy = role;
    if (role === "AR" || role === "JR" || role === "DR") {
        approvedBy = "PURCHASE";
    }
    try {
        const forms = await prisma.form.findMany({
            where: {
                approvedBy: approvedBy,
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        })
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedFormsAccountSection: ", error.message);
    }
}

// Controller for approved forms by the registrar
const approvedFormsRegistrar = async (req, res) => {
    try {
        const forms = await prisma.form.findMany({
            where: {
                approvedBy: "REGISTRAR",
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true
            }
        })
        res.status(200).json(forms);
    }
    catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedFormsRegistrar: ", error.message);
    }
}

// reject form
const rejectForm = async (req, res) => {
    const { formID, remarks } = req.body;

    try {
        await prisma.form.update({
            where: {
                id: formID
            },
            data: {
                remarks: remarks,
                rejectedBy: "HOD",
                status: "REJECTED",
            }
        });

        res.status(200).json({
            message: "Form rejected successfully"
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectForm: ", error.message);
    }
}

// Controller for rejecting form by the account section
const rejectFormAccountSection = async (req, res) => {
    const { formID, role, remarks } = req.body;
    let rejectedBy = role;
    if (role === "AR" || role === "JR" || role === "DR") {
        rejectedBy = "ACCOUNTS";
    }

    try {
        await prisma.form.update({
            where: {
                id: formID
            },
            data: {
                rejectedBy: rejectedBy,
                remarks: remarks,
            }
        });

        res.status(200).json({
            message: "Form rejected successfully",
        });

    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectFormAccountSection: ", error.message);
    }
}

// Controller for rejecting form by the purchase section
const rejectFormPurchaseSection = async (req, res) => {
    const { formID, role, remarks } = req.body;
    let rejectedBy = role;
    if (role === "AR" || role === "JR" || role === "DR") {
        rejectedBy = "PURCHASE";
    }

    try {
        await prisma.form.update({
            where: {
                id: formID
            },
            data: {
                rejectedBy: rejectedBy,
                remarks: remarks,
            }
        });

        res.status(200).json({
            message: "Form rejected successfully",
        });

    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectFormPurchaseSection: ", error.message);
    }
}

// Controller for rejecting form by the registrar
const rejectFormRegistrar = async (req, res) => {
    const { formID, remarks } = req.body;

    try {
        await prisma.form.update({
            where: {
                id: formID
            },
            data: {
                rejectedBy: rejectedBy,
                remarks: remarks,
            }
        });

        res.status(200).json({
            message: "Form rejected successfully",
        });

    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectFormRegistrar: ", error.message);
    }
}

// Controller for fetching rejected forms of a user(faculty)
const rejectedForms = async (req, res) => {
    const { userId, department } = req.body;
    const id = parseInt(userId);
    try {
        const forms = await prisma.form.findMany({
            where: {
                userId: id,
                department: department,
                status: "REJECTED"
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectedForms: ", error.message);
    }
}

const rejectedFormsHOD = async (req, res) => {
    const { department, email } = req.body;
    try {
        const forms = await prisma.form.findMany({
            where: {
                AND: [
                    { status: "REJECTED" }, // Ensure that status is "PENDING"
                    {
                        OR: [
                            { department: department },
                            { sendTo: { contains: email } },
                        ],
                    },
                ],
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectedForms: ", error.message);
    }
}

const rejectedFormsAccountSection = async (req, res) => {
    const { role } = req.body;
    let rejectedBy = role;
    if (role === "AR" || role === "JR" || role === "DR") {
        rejectedBy = "ACCOUNTS";
    }

    try {
        const forms = await prisma.form.findMany({
            where: {
                rejectedBy: rejectedBy,
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true
            }
        })

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectedFormsAccountSection: ", error.message);
    }
}

const rejectedFormsPurchaseSection = async (req, res) => {
    const { role } = req.body;
    let rejectedBy = role;
    if (role === "AR" || role === "JR" || role === "DR") {
        rejectedBy = "PURCHASE";
    }
    try {
        const forms = await prisma.form.findMany({
            where: {
                rejectedBy: rejectedBy,
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true,
            }
        })
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectedFormsAccountSection: ", error.message);
    }
}

const rejectedFormsRegistrar = async (req, res) => {
    try {
        const forms = await prisma.form.findMany({
            where: {
                rejectedBy: "REGISTRAR",
            },
            include: {
                items: true,
                signatures: true,
                budgetSection: true,
                purchaseSection: true
            }
        })
        res.status(200).json(forms);
    }
    catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in rejectedFormsRegistrar: ", error.message);
    }
}

// Controller for getting form by id
const getFormById = async (req, res) => {
    const { form_id, role, department } = req.body;
    try {
        const includeObj = {
            items: true,
            signatures: true,
        };

        if (department === "ACC" && (role === "AO" || role === "AR" || role === "JR" || role === "DR")) {
            includeObj.budgetSection = true; // If role is "AO", include 'budgetSection'
        }
        else if (department === "PUR" && (role === "JS" || role === "AR" || role === "JR" || role === "DR")) {
            includeObj.budgetSection = true; // If role is "JS", include 'budgetSection'
            includeObj.purchaseSection = true; // If role is "JS", include 'purchaseSection'
        }

        const form = await prisma.form.findFirst({
            where: {
                id: form_id
            },
            include: includeObj
        });

        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in getFormById: ", error.message);
    }
}

export {
    submitFormSP101, withdrawForm,
    pendingForms, pendingFormsAdmin, pendingFormsHOD, pendingFormsAccountSection, pendingFormsPurchaseSection, pendingFormsRegistrar,
    approvedForms, approvedFormsHOD, approvedFormsAccountSection, approvedFormsPurchaseSection, approvedFormsRegistrar,
    approveForm, approveFormAccountSection, approveFormPurchaseSection, approveFormRegistrar,
    rejectForm, rejectFormAccountSection, rejectFormPurchaseSection, rejectFormRegistrar,
    rejectedForms, rejectedFormsHOD, rejectedFormsAccountSection, rejectedFormsPurchaseSection, rejectedFormsRegistrar,
    getFormById
}