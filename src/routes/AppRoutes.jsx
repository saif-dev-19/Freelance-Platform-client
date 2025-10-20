import React from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../component/PrivateRoute';
import ActiveAccount from '../component/Registration/ActiveAccount';
import DashboardLayout from '../component/Dashboard/DashboardLayout';
import Profile from '../pages/Profile';
import ServiceDetailsPage from '../pages/ServiceDetailsPage';
import Orders from '../pages/Orders';
import ConfirmOrderPage from '../pages/ConfirmOrderPage';
import PaymentSuccess from '../pages/PaymentSuccess';
import MyServices from '../pages/MyServices';
import Service from '../pages/Service';
import AddService from '../pages/AddService';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AddCategory from '../pages/AddCategory';
import ManageUsers from '../pages/ManageUsers';
import ManageServices from '../pages/ManageServices';
import EditService from '../pages/EditService';


const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route index element={<Home />} /> */}

            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='services' element={<Service />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='categories' element={<Category />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="activate/:uid/:token" element={<ActiveAccount />} />
                <Route path='services/:serviceID' element={<ServiceDetailsPage />} />
                <Route path='services/:serviceID/order' element={<ConfirmOrderPage />} />

            </Route>
            
            <Route 
                path="dashboard" 
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }>
                <Route index element ={<Dashboard />}/>
                <Route path='profile' element={<Profile />} />
                <Route path='orders' element={<Orders />} />
                <Route path='my-services' element={<MyServices />} />
                <Route path='payment/success' element={<PaymentSuccess />} />
                <Route path='add-service' element={<AddService />} />
                <Route path='add-category' element={<AddCategory />} />  
                <Route path='manage-user' element={<ManageUsers />} /> 
                <Route path='manage-service' element={<ManageServices />} />
                <Route path="services/edit/:id" element={<EditService />} /> 
            </Route>

        </Routes>
    );
};

export default AppRoutes;