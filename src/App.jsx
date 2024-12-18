import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PageNotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import CheckTokenPage from "./pages/CheckTokenPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BrowseScholarship from "./pages/BrowseScholarship";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import Layout from "./layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";
import ScolarshipDetails from "./features/scholardetails/ScolarshipDetails";
import Scholarship from "./pages/Scholarship";
import SavedScholarships from "./features/savedscholarship/SavedScholarship";
import NoAuthenticatedRoute from "./ui/NoAuthenticatedRoute";
import PricingPage from "./pages/PricingPage";
import SuccessPage from "./pages/SuccessPage";
import PortfolioPage from "./pages/PortfolioPage";
import MatchingPercentage from "./pages/MatchingPercentage";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        gutter={15}
        containerStyle={{ margin: "80px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/profile/*"
              element={
                <NoAuthenticatedRoute>
                  <ProfilePage />
                </NoAuthenticatedRoute>
              }
            />
            <Route
              path="/Portfolio/*"
              element={
                  <NoAuthenticatedRoute>
                   <PortfolioPage />
                </NoAuthenticatedRoute>
              }
            />
            <Route
              path="/saved-scholarship"
              element={
                <NoAuthenticatedRoute>
                  <SavedScholarships />
                </NoAuthenticatedRoute>
              }
            />
            <Route
              path="/scolarshipdetails/:scholarshipId/*"
              element={<ScolarshipDetails />}
            />
            <Route path="/scholarships" element={<Scholarship />} />
            <Route
              path="/browse-scholarships"
              element={<BrowseScholarship />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <SignupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forget-password"
              element={
                <ProtectedRoute>
                  <ForgetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-reset-password-token"
              element={
                <ProtectedRoute>
                  <CheckTokenPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <NoAuthenticatedRoute>
                  <PricingPage />
                </NoAuthenticatedRoute>
              }
            />
            <Route
              path="/buy-success/*"
              element={
                <NoAuthenticatedRoute>
                  <SuccessPage />{" "}
                </NoAuthenticatedRoute>
              }
            />
            <Route
              path="/matching-percentage"
              element={
                <NoAuthenticatedRoute>
                  <MatchingPercentage />{" "}
                </NoAuthenticatedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
