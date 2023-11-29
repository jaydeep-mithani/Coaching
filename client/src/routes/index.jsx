import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/home/home";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import OnlineCourses from "../pages/onlineCourses/onlineCourses";
import BecomeYourCreator from "../pages/becomeYourCreater/becomeYourCreater";
import WealthCreationSection from "../pages/../sections/WealthCreation";
import CoachDetail from "../pages/coachDetail/coachDetail";
import Contact from "../pages/contact/contact";
import Event from "../pages/event/event";
import AllCoaches from "../pages/ourCoaches/ourCoaches";
import OurCoachesDetail from "../pages/ourCoaches/ourCoachesDetail";
import SmoothScroll from "../components/shared/SmoothScroll";
import SessionsPage from "../pages/Sessions";
import ResetPassword from "../pages/resetPassword/resetPassword";
import TermsAndConditions from "../pages/termsAndConditions/termsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import SuccessModal from "../components/SuccessModal";
import PreviousPurchases from "../pages/previousPurchases/previousPurchases";
import Packages from "../pages/packages/packages";
import NotFound from "../pages/notFound/NotFound";

const Routers = () => {
  return (
    <Router>
      <Navbar />
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/?success=true" element={<SuccessModal />} />
          <Route path="/our-coaches" element={<AllCoaches />} />
          {/* <Route path="/online-courses" element={<OnlineCourses />} /> */}
          <Route path="/coaching-with-rita" element={<CoachDetail />} />
          <Route path="/become-your-creator" element={<BecomeYourCreator />} />
          <Route path="/wealth-creation" element={<WealthCreationSection />} />
          <Route path="/events" element={<Event />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/ourCoachesDetail/:id" element={<OurCoachesDetail />} />
          <Route element={<PrivateRoute />}>
            <Route path="/session" element={<SessionsPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/previous-purchases" element={<PreviousPurchases />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<Packages />} />
          </Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
      <Footer />
    </Router>
  );
};

export default Routers;
