import { Routes, Route, BrowserRouter } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider } from '@chakra-ui/react'
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import Error from "./pages/Error"
import HomePage from "./pages/Home/HomePage"
import LoginOtpPage from "./pages/Login/LoginOtpPage"
import RegisterOtpPage from "./pages/Register/RegisterOtpPage"
import Form_sp101 from "./pages/Forms/Form_sp101"
import ApprovedForms from "./pages/ApprovedForms/ApprovedForms"
import PendingForms from "./pages/Pending Forms/PendingForms"
import RejectedForms from "./pages/Rejected Forms/RejectedForms"
import FormsStatus from "./pages/FormsStatus/FormsStatus"
import Header from "./components/Header/header"
import { FooterWithSocialLinks } from "./components/Footer/Footer"
import ContextFormSP101DataProvider from "./Context/ContextFormSP101DataProvider"
import AboutUs from "./pages/AboutUs/AboutUs"
import FAQ from "./pages/FAQ"
import EditApproveForm from "./pages/EditApproveForm/EditApproveForm"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <ContextFormSP101DataProvider >
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/login/user/otp' element={<LoginOtpPage />} />
              <Route path='/register/user/otp' element={<RegisterOtpPage />} />
              <Route exact path="/forms/SP101" element={<ProtectedRoute> <Form_sp101 /> </ProtectedRoute>} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
              <Route path="/approvedForms" element={<ProtectedRoute><ApprovedForms /></ProtectedRoute>} />
              <Route path="/pendingForms" element={<ProtectedRoute><PendingForms /></ProtectedRoute>} />
              <Route path="/rejectedForms" element={<ProtectedRoute><RejectedForms /></ProtectedRoute>} />
              <Route path="/formsStatus" element={<ProtectedRoute><FormsStatus /></ProtectedRoute>} />
              <Route path="/pendingForm/:form_id" element={<ProtectedRoute><EditApproveForm /></ProtectedRoute>} />
              <Route path='*' element={<Error />} />
            </Routes>
            <FooterWithSocialLinks />
          </ContextFormSP101DataProvider>
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App
