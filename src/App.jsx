// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Meeting from './pages/performance&activity/meetingfold/Meeting';
import ProfitabilityAnalysis from './pages/projectfinancials/profitabilityanalysis/ProfitabilityAnalysis';
import Settings from './pages/settings/settingsfold/Settings';
import LeadCapture from './pages/crm/LeadCapture/LeadCapture';
import Dashboard from './pages/mainmenu/dashboardfold/Dashboard';
import FunnelReview from './pages/crm/funnelreview/FunnelReview';
import KRA from './pages/performance&activity/krafold/KRA';
import MarketingROI from './pages/crm/marketingroi/MarketingROI';
import Order from './pages/crm/orderfold/Order';
import FinancialMis from './pages/projectfinancials/financialmis/FinancialMis';
import AddLeadsFormLayout from './pages/crm/LeadCapture/AddLeadsFormLayout';
import EditLeadsFormLayout from './pages/crm/LeadCapture/EditLeadsFormLayout';
import AddFunnelReview from './pages/crm/funnelreview/AddFunnelReview';
import EditFunnelReview from './pages/crm/funnelreview/EditFunnelReview';
import AddOrder from './pages/crm/orderfold/AddOrder';
import EditOrder from './pages/crm/orderfold/EditOrder';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/lead-capture" element={<LeadCapture/>} />
        <Route path="/lead-capture/add" element={<AddLeadsFormLayout/>} />
        <Route path="/lead-capture/edit/:id" element={<EditLeadsFormLayout/>}/>
        <Route path="/funnel-review" element={<FunnelReview/>} />
        <Route path="/funnel-review/add" element={<AddFunnelReview/>} />
        <Route path="/funnel-review/edit/:id" element={<EditFunnelReview/>} />
        <Route path="/marketing-roi" element={<MarketingROI />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/add" element={<AddOrder/>}/>
        <Route path="/order/edit/:id" element={<EditOrder/>}/>
        <Route path="/kra" element={<KRA />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/profitability-analysis" element={<ProfitabilityAnalysis />} />
        <Route path="/financial-mis" element={<FinancialMis/>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
