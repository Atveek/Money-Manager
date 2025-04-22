import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessHome from "./pages/BusinessHome";
import BusinessLayout from "./components/Layout/BusinessLayout";
import BusinessCustomer from "./pages/BusinessCustomer";
import BusinessSupplier from "./pages/BusinessSupplier";
import Defaultpage from "./pages/Defaultpage";
import BusinessBills from "./pages/BusinessBills";
import Bill from "./pages/Bill";
import CreateBills from "./pages/CreateBills";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Defaultpage />} />
      <Route
        path="/personal"
        element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/business"
        element={
          <Business>
            <BusinessHome />
          </Business>
        }
      />
      <Route
        path="/business/bills"
        element={
          <Business>
            <BusinessBills />
          </Business>
        }
      />
      <Route
        path="/business/bills/create"
        element={
          <Business>
            <CreateBills />
          </Business>
        }
      />
      <Route
        path="/business/bills/create/:id"
        element={
          <Business>
            <CreateBills />
          </Business>
        }
      />
      <Route
        path="/business/bills/:id"
        element={
          <Business>
            <Bill />
          </Business>
        }
      />
      <Route
        path="/business/customer"
        element={
          <Business>
            <BusinessCustomer />
          </Business>
        }
      />
      <Route
        path="/business/supplier"
        element={
          <Business>
            <BusinessSupplier />
          </Business>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export function Business({ children }) {
  return (
    <ProtectedRoutes>
      <BusinessLayout>{children}</BusinessLayout>
    </ProtectedRoutes>
  );
}

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
