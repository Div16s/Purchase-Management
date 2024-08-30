import express from 'express';
import {
    submitFormSP101, withdrawForm,
    pendingForms, pendingFormsAdmin, pendingFormsHOD, pendingFormsAccountSection, pendingFormsPurchaseSection, pendingFormsRegistrar,
    approvedForms, approvedFormsHOD, approvedFormsAccountSection, approvedFormsPurchaseSection, approvedFormsRegistrar,
    approveForm, approveFormAccountSection, approveFormPurchaseSection, approveFormRegistrar,
    rejectForm, rejectFormAccountSection, rejectFormPurchaseSection, rejectFormRegistrar, 
    rejectedForms, rejectedFormsHOD, rejectedFormsAccountSection, rejectedFormsPurchaseSection, rejectedFormsRegistrar, 
    getFormById,
} from '../controllers/formController.js'
import authenticateToken from '../utils/authenticateToken.js';

const router = new express.Router();

router.post('/submitSP101', authenticateToken, submitFormSP101);
router.post('/withdraw', authenticateToken, withdrawForm);

router.post('/pending', authenticateToken, pendingForms);
router.post('/pending/Admin', authenticateToken, pendingFormsAdmin)
router.post('/pending/HOD', authenticateToken, pendingFormsHOD);
router.post('/pending/AccountSection', authenticateToken, pendingFormsAccountSection);
router.post('/pending/PurchaseSection', authenticateToken, pendingFormsPurchaseSection);
router.post('/pending/Registrar', authenticateToken, pendingFormsRegistrar);

router.post('/approve', authenticateToken, approveForm);
router.post('/approve/AccountSection', authenticateToken, approveFormAccountSection);
router.post('/approve/PurchaseSection', authenticateToken, approveFormPurchaseSection);
router.post('/approve/Registrar', authenticateToken, approveFormRegistrar);

router.post('/approved', authenticateToken, approvedForms);
router.post('/approved/HOD', authenticateToken, approvedFormsHOD);
router.post('/approved/AccountSection', authenticateToken, approvedFormsAccountSection);
router.post('/approved/PurchaseSection', authenticateToken, approvedFormsPurchaseSection);
router.post('/approved/Registrar', authenticateToken, approvedFormsRegistrar);

router.post('/reject/HOD', authenticateToken, rejectForm);
router.post('/reject/AccountSection', authenticateToken, rejectFormAccountSection);
router.post('/reject/PurchaseSection', authenticateToken, rejectFormPurchaseSection);
router.post('/reject/Registrar', authenticateToken, rejectFormRegistrar);

router.post('/rejected', authenticateToken, rejectedForms);
router.post('/rejected/HOD', authenticateToken, rejectedFormsHOD);
router.post('/rejected/AccountSection', authenticateToken, rejectedFormsAccountSection);
router.post('/rejected/PurchaseSection', authenticateToken, rejectedFormsPurchaseSection);
router.post('/rejected/Registrar', authenticateToken, rejectedFormsRegistrar);

router.post('/getFormById', authenticateToken, getFormById);


export default router;