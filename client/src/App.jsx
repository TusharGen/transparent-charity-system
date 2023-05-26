import React from "react";
import { Route, Routes } from "react-router-dom";

import { CampaignDetails, Home, Profile } from "./pages";
import CreateCharityProject from './pages/beneficiary/CreateCharityProject';

import BenDashLayout  from './pages/beneficiary/BenDashLayout';
import DonorDashLayout from './pages/donor/DonorDashLayout';
import StoreDashLayout from './pages/cooperativeStore/StoreDashLayout';
import OrgDashLayout from './pages/charityOrganization/OrgDashLayout';

const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/beneficiary-dashboard/*" element={<BenDashLayout />}>
            {/* <Route path="/" element={<DashboardAppPage />} /> */}
            <Route path="create-charity-project" element={<CreateCharityProject />}/>
            <Route path="campaign-details/:id" element={<CampaignDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/donor-dashboard/*" element={<DonorDashLayout />}>
            {/* <Route path="/" element={<DashboardAppPage />} /> */}
            <Route path="campaign-details/:id" element={<CampaignDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/store-dashboard/*" element={<StoreDashLayout />}>
            {/* <Route path="/" element={<DashboardAppPage />} /> */}
            <Route path="campaign-details/:id" element={<CampaignDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          <Route path="/charityorg-dashboard/*" element={<OrgDashLayout />}>
            {/* <Route path="/" element={<DashboardAppPage />} /> */}
            <Route path="campaign-details/:id" element={<CampaignDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
  );
};

export default App;
