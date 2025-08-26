// src/App.js (or src/App.jsx)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

// Main menu and dashboard
import Dashboard from './pages/mainmenu/dashboardfold/Dashboard';

// CRM and Lead Capture
import LeadCapture from './pages/crm/LeadCapture/LeadCapture';

// Funnel Review
import FunnelReview from './pages/crm/funnelreview/FunnelReview';
import AddFunnelReview from './pages/crm/funnelreview/AddFunnelReview';
import EditFunnelReview from './pages/crm/funnelreview/EditFunnelReview';

// Marketing ROI, Order Management
import MarketingROI from './pages/crm/marketingroi/MarketingROI';
import Order from './pages/crm/orderfold/Order';
import AddOrder from './pages/crm/orderfold/AddOrder';
import EditOrder from './pages/crm/orderfold/EditOrder';

// Performance & Activity
import Meeting from './pages/performance&activity/meetingfold/Meeting';
import KRA from './pages/performance&activity/krafold/KRA';

// Project Financials
import ProfitabilityAnalysis from './pages/projectfinancials/profitabilityanalysis/ProfitabilityAnalysis';
import ProfitabilitySummaryAdd from './pages/projectfinancials/profitabilityanalysis/ProfitabilitySummaryAdd';
import ProfitabilitySummaryEdit from './pages/projectfinancials/profitabilityanalysis/ProfitabilitySummaryEdit';
import FinancialMis from './pages/projectfinancials/financialmis/FinancialMis';
import FinancialMisAdd from './pages/projectfinancials/financialmis/FinancialMisAdd';
import FinancialMisEdit from './pages/projectfinancials/financialmis/FinancialMisEdit';

// Performance MIS
import PerformanceMisTable from './pages/projectfinancials/performancemis/PerformanceMisTable';
import { PerformanceMisAdd } from './pages/projectfinancials/performancemis/PerformanceMisAdd';
import { PerformanceMisEdit } from './pages/projectfinancials/performancemis/PerformanceMisEdit';

// Profile
import UserProfileForm from './pages/profile/UserProfileForm';

// Settings tables and forms
import Settings from './pages/settings/designation/Settings';
import EmployeeMasterTable from './pages/settings/employee-master/EmployeeMasterTable';
import EmployeeMasterAdd from './pages/settings/employee-master/EmployeeMasterAdd';
import EmployeeMasterEdit from './pages/settings/employee-master/EmployeeMasterEdit';

import DesignationTable from './pages/settings/designation/DesignationTable';
import DesignationAdd from './pages/settings/designation/DesignationAdd';
import DesignationEdit from './pages/settings/designation/DesignationEdit';

import DepartmentTable from './pages/settings/department/DepartmentTable';
import DepartmentAdd from './pages/settings/department/DepartmentAdd';
import DepartmentEdit from './pages/settings/department/DepartmentEdit';

import LeadTypeTable from './pages/settings/leadtype/LeadTypeTable';
import LeadTypeAdd from './pages/settings/leadtype/LeadTypeAdd';
import LeadTypeEdit from './pages/settings/leadtype/LeadTypeEdit';

import LeadSourceTable from './pages/settings/leadsource/LeadSourceTable';
import LeadSourceAdd from './pages/settings/leadsource/LeadSourceAdd';
import LeadSourceEdit from './pages/settings/leadsource/LeadSourceEdit';

import CategoryTable from './pages/settings/category/CategoryTable';
import CategoryAdd from './pages/settings/category/CategoryAdd';
import CategoryEdit from './pages/settings/category/CategoryEdit';

import ActionTable from './pages/settings/action/ActionTable';
import ActionAdd from './pages/settings/action/ActionAdd';
import ActionEdit from './pages/settings/action/ActionEdit';

import StatusTable from './pages/settings/status/StatusTable';
import StatusAdd from './pages/settings/status/StatusAdd';
import StatusEdit from './pages/settings/status/StatusEdit';

import FollowUpModeTable from './pages/settings/followupmode/FollowUpModeTable';
import FollowUpModeAdd from './pages/settings/followupmode/FollowUpModeAdd';
import FollowUpModeEdit from './pages/settings/followupmode/FollowUpModeEdit';

import CompanyTable from './pages/settings/company/CompanyTable';
import CompanyAdd from './pages/settings/company/CompanyAdd';
import CompanyEdit from './pages/settings/company/CompanyEdit';

import ServicesTable from './pages/settings/services/ServicesTable';
import ServicesAdd from './pages/settings/services/ServicesAdd';
import ServicesEdit from './pages/settings/services/ServicesEdit';

import CampaignTypeTable from './pages/settings/campaigntype/CampaignTypeTable';
import CampaignTypeAdd from './pages/settings/campaigntype/CampaignTypeAdd';
import CampaignTypeEdit from './pages/settings/campaigntype/CampaignTypeEdit';

import TypeOfAdvertisingTable from './pages/settings/typeofadvertising/TypeOfAdvertisingTable';
import TypeOfAdvertisingAdd from './pages/settings/typeofadvertising/TypeOfAdvertisingAdd';
import TypeOfAdvertisingEdit from './pages/settings/typeofadvertising/TypeOfAdvertisingEdit';

import MarketingChannelTable from './pages/settings/marketingchannel/MarketingChannelTable';
import MarketingChannelAdd from './pages/settings/marketingchannel/MarketingChannelAdd';
import MarketingChannelEdit from './pages/settings/marketingchannel/MarketingChannelEdit';
import EditLeadsFormLayoutForm from './pages/crm/LeadCapture/EditLeadsFormLayout';
import AddLeadsFormLayout from './pages/crm/LeadCapture/AddLeadsFormLayout';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/lead-capture" element={<LeadCapture/>} />
        <Route path="/lead-capture/add" element={<AddLeadsFormLayout/>} />
        <Route path="/lead-capture/edit/:id" element={<EditLeadsFormLayoutForm />} />
        <Route path="/funnel-review" element={<FunnelReview />} />
        <Route path="/funnel-review/add" element={<AddFunnelReview />} />
        <Route path="/funnel-review/edit/:id" element={<EditFunnelReview />} />
        <Route path="/marketing-roi" element={<MarketingROI />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/add" element={<AddOrder />} />
        <Route path="/order/edit/:id" element={<EditOrder />} />
        <Route path="/kra" element={<KRA />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/profitability-analysis" element={<ProfitabilityAnalysis />} />
        <Route path="/profitability-analysis/add" element={<ProfitabilitySummaryAdd />} />
        <Route path="/profitability-analysis/edit/:id" element={<ProfitabilitySummaryEdit />} />
        <Route path="/financial-mis" element={<FinancialMis />} />
        <Route path="/financial-mis/add" element={<FinancialMisAdd />} />
        <Route path="/financial-mis/edit/:id" element={<FinancialMisEdit />} />
        <Route path="/performance-mis" element={<PerformanceMisTable />} />
        <Route path="/performance-mis/add" element={<PerformanceMisAdd />} />
        <Route path="/performance-mis/edit/:id" element={<PerformanceMisEdit />} />
        <Route path="/profile" element={<UserProfileForm />} />

        {/* Settings routes */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/employee-master" element={<EmployeeMasterTable />} />
        <Route path="/settings/employee-master/add" element={<EmployeeMasterAdd />} />
        <Route path="/settings/employee-master/edit/:id" element={<EmployeeMasterEdit />} />

        <Route path="/settings/designation" element={<DesignationTable />} />
        <Route path="/settings/designation/add" element={<DesignationAdd />} />
        <Route path="/settings/designation/edit/:id" element={<DesignationEdit />} />

        <Route path="/settings/department" element={<DepartmentTable />} />
        <Route path="/settings/department/add" element={<DepartmentAdd />} />
        <Route path="/settings/department/edit/:id" element={<DepartmentEdit />} />

        <Route path="/settings/lead-type" element={<LeadTypeTable />} />
        <Route path="/settings/lead-type/add" element={<LeadTypeAdd />} />
        <Route path="/settings/lead-type/edit/:id" element={<LeadTypeEdit />} />

        <Route path="/settings/lead-source" element={<LeadSourceTable />} />
        <Route path="/settings/lead-source/add" element={<LeadSourceAdd />} />
        <Route path="/settings/lead-source/edit/:id" element={<LeadSourceEdit />} />

        <Route path="/settings/category" element={<CategoryTable />} />
        <Route path="/settings/category/add" element={<CategoryAdd />} />
        <Route path="/settings/category/edit/:id" element={<CategoryEdit />} />

        <Route path="/settings/action" element={<ActionTable />} />
        <Route path="/settings/action/add" element={<ActionAdd />} />
        <Route path="/settings/action/edit/:id" element={<ActionEdit />} />

        <Route path="/settings/status" element={<StatusTable />} />
        <Route path="/settings/status/add" element={<StatusAdd />} />
        <Route path="/settings/status/edit/:id" element={<StatusEdit />} />

        <Route path="/settings/follow-up-mode" element={<FollowUpModeTable />} />
        <Route path="/settings/follow-up-mode/add" element={<FollowUpModeAdd />} />
        <Route path="/settings/follow-up-mode/edit/:id" element={<FollowUpModeEdit />} />

        <Route path="/settings/company" element={<CompanyTable />} />
        <Route path="/settings/company/add" element={<CompanyAdd />} />
        <Route path="/settings/company/edit/:id" element={<CompanyEdit />} />

        <Route path="/settings/services" element={<ServicesTable />} />
        <Route path="/settings/services/add" element={<ServicesAdd />} />
        <Route path="/settings/services/edit/:id" element={<ServicesEdit />} />

        <Route path="/settings/campaign-type" element={<CampaignTypeTable />} />
        <Route path="/settings/campaign-type/add" element={<CampaignTypeAdd />} />
        <Route path="/settings/campaign-type/edit/:id" element={<CampaignTypeEdit />} />

        <Route path="/settings/type-of-advertising" element={<TypeOfAdvertisingTable />} />
        <Route path="/settings/type-of-advertising/add" element={<TypeOfAdvertisingAdd />} />
        <Route path="/settings/type-of-advertising/edit/:id" element={<TypeOfAdvertisingEdit />} />

        <Route path="/settings/marketing-channel" element={<MarketingChannelTable />} />
        <Route path="/settings/marketing-channel/add" element={<MarketingChannelAdd />} />
        <Route path="/settings/marketing-channel/edit/:id" element={<MarketingChannelEdit />} />
      </Routes>
    </Layout>
  );
}

export default App;
