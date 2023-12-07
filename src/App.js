// import Footer from "./components/Footer/footer";
// import Login from "./pages/Authentication/Login";
// import Header from './components/Header/hearder'
import React from "react";
import Dashboard from "./components/DashBoard/Dashboard";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Destination from "./components/DashBoard/Destination";
import Tourist from "./components/DashBoard/Tourist";
import Banks from "./components/DashBoard/Banks";
import Hotels from "./components/DashBoard/Hotels";
import Offices from "./components/DashBoard/Offices";
import UserManagement from "./components/DashBoard/UserManagement";
import TourOperator from "./components/DashBoard/TourOperator";
import Packages from "./components/DashBoard/Packages";
import Employee from "./components/DashBoard/Employee";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Grid } from "@mui/material";
import Reports from "./components/DashBoard/Reports";
import  Login  from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import PrivateRoutes from "./services/api/PrivateRoutes";
import UserPage from "./pages/UI/UserPage";
import TouristPage from "./pages/UI/TouristPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} mt={8}>
      <Grid item lg={11} sm={12}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/signup' element={<Registration />} />
              <Route  element={<PrivateRoutes />} >
              <Route path="/dashboard" name="dashboard" element={<Dashboard />}>
                <Route index element={<Reports />}></Route>
                <Route path={"reports"} element={<Reports />}></Route>
                <Route path={"destinantion"} element={<Destination />}></Route>
                <Route path={"hotels"} element={<Hotels />}></Route>
                <Route path={"tourist"} element={<TouristPage />}></Route>
                <Route path={"banks"} element={<Banks />}></Route>
                <Route path={"offices"} element={<Offices />}></Route>
                <Route path={"userManagement"} element={<UserPage />} > </Route>
                <Route path={"tourOperator"} element={<TourOperator />}></Route>
                <Route path={"packages"} element={<Packages />}></Route>
                <Route path={"employee"} element={<Employee />}></Route>
              </Route>
              </Route>
            </Routes>
          </QueryClientProvider>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}
export default App;
