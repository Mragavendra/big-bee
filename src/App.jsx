// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Meeting from './pages/performance&activity/meetingfold/Meeting';
import ProfitabilityAnalysis from './pages/projectfinancials/profitabilityanalysis/ProfitabilityAnalysis';
import Settings from './pages/settings/designation/Settings';
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
import EmployeeMasterTable from './pages/settings/employee-master/EmployeeMasterTable';
import DesignationTable from './pages/settings/designation/DesignationTable';
import DepartmentTable from './pages/settings/department/DepartmentTable';
import LeadTypeTable from './pages/settings/leadtype/LeadTypeTable';
import LeadSourceTable from './pages/settings/leadsource/LeadSourceTable';
import CategoryTable from './pages/settings/category/CategoryTable';
import ActionTable from './pages/settings/action/ActionTable';
import StatusTable from './pages/settings/status/StatusTable';
import FollowUpModeTable from './pages/settings/followupmode/FollowUpModeTable';
import CompanyTable from './pages/settings/company/CompanyTable';
import ServicesTable from './pages/settings/services/ServicesTable';
import CampaignTypeTable from './pages/settings/campaigntype/CampaignTypeTable';
import TypeOfAdvertisingTable from './pages/settings/typeofadvertising/TypeOfAdvertisingTable';
import MarketingChannelTable from './pages/settings/marketingchannel/MarketingChannelTable';
import EmployeeMasterAdd from './pages/settings/employee-master/EmployeeMasterAdd';
import EmployeeMasterEdit from './pages/settings/employee-master/EmployeeMasterEdit';
import DesignationAdd from './pages/settings/designation/DesignationAdd';
import DesignationEdit from './pages/settings/designation/DesignationEdit';
import DepartmentAdd from './pages/settings/department/DepartmentAdd';
import DepartmentEdit from './pages/settings/department/DepartmentEdit';
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



                  {/* ==== settings======= */}

        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/employee-master" element={<EmployeeMasterTable/>} />
        <Route path="/settings/employee-master/add" element={<EmployeeMasterAdd/>} />
        <Route path="/settings/employee-master/edit/:id" element={<EmployeeMasterEdit/>} />

        <Route path="/settings/designation" element={<DesignationTable/>} />
        <Route path="/settings/designation/add" element={<DesignationAdd/>} />
        <Route path="/settings/designation/edit/:id" element={<DesignationEdit/>} />


        <Route path="/settings/department" element={<DepartmentTable/>} />
        <Route path="/settings/department/add" element={<DepartmentAdd/>} />
        <Route path="/settings/department/edit/:id" element={<DepartmentEdit/>} />

        <Route path="/settings/lead-type" element={<LeadTypeTable/>} />
        <Route path="/settings/lead-source" element={<LeadSourceTable/>} />
        <Route path="/settings/category" element={<CategoryTable/>}/>
        <Route path="/settings/action" element={<ActionTable/>} />
        <Route path="/settings/status" element={<StatusTable/>} />
        <Route path="/settings/follow-up-mode" element={<FollowUpModeTable/>} />
        <Route path="/settings/company" element={<CompanyTable/>} />
        <Route path="/settings/services" element={<ServicesTable/>} />
        <Route path="/settings/campaign-type" element={<CampaignTypeTable/>} />
        <Route path="/settings/type-of-advertising" element={<TypeOfAdvertisingTable/>} />
        <Route path="/settings/marketing-channel" element={<MarketingChannelTable/>} />
      </Routes>
    </Layout>
  );
}

export default App;
