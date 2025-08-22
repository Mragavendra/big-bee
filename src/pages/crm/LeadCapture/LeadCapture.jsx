import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import { 
  AssignmentInd as AssignmentIndIcon,
  UploadFile as UploadFileIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Button, Typography, Box, Stack, TextField, IconButton, Modal, Fade, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4, 4, 3),
  outline: 'none',
}));

const LeadCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to control modal visibility
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns = [
    { id: 'enquiryNo', label: 'Enquiry No', width: 120 },
    { id: 'leadDate', label: 'Lead Date', width: 120 },
    { id: 'leadType', label: 'Lead Type', width: 120 },
    { id: 'leadSource', label: 'Lead Source', width: 150 },
    { id: 'prospect', label: 'Prospect', width: 180 },
    { id: 'mobileNumber', label: 'Mobile Number', width: 140 },
    { id: 'assignedBde', label: 'Assigned BDE', width: 150 },
    { id: 'assignedCs', label: 'Assigned CS', width: 150 },
  ];

  const data = [
    {
      id: '1',
      enquiryNo: 'L_001',
      leadDate: '12/08/2025',
      leadType: 'Inbound',
      leadSource: 'Google Ads',
      prospect: 'ABC Pvt. Ltd.',
      mobileNumber: '9123456789',
      assignedBde: 'Anand Kumar',
      assignedCs: 'Priya Menon',
      status: 'Active',
      category: 'General',
    },
    {
      id: '2',
      enquiryNo: 'L_002',
      leadDate: '12/08/2025',
      leadType: 'Inbound',
      leadSource: 'Google Ads',
      prospect: 'Mahindra Logistics',
      mobileNumber: '9123456789',
      assignedBde: '-',
      assignedCs: '-',
      status: 'Inactive',
      category: 'General',
    },
    {
      id: '3',
      enquiryNo: 'L_003',
      leadDate: '12/08/2025',
      leadType: 'Inbound',
      leadSource: 'Google Ads',
      prospect: 'Prestige Group',
      mobileNumber: '9123456789',
      assignedBde: '-',
      assignedCs: '-',
      status: 'Inactive',
      category: 'General',
    },
  ];

  const headerButtons = [
    {
      label: 'Assign',
      variant: 'outlined',
      size: 'small',
      startIcon: <AssignmentIndIcon fontSize="small" />,
      onClick: () => navigate(`${location.pathname}/assign`),
      props: { 
        sx: { 
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA'
          },
          textTransform: 'none',
          borderRadius: '8px'
        } 
      },
    },
    {
      label: 'Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon fontSize="small" />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { 
        sx: { 
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA'
          },
          textTransform: 'none',
          borderRadius: '8px'
        } 
      },
    },
  ];

  return (
    <>
      <DynamicTable
        title="Leads Management"
        columns={columns}
        data={data}
        rowsPerPage={5}
        headerButtons={headerButtons}
        addButtonLabel="Add Leads"
        addButtonProps={{
          variant: 'contained',
          size: 'small',
          startIcon: <AddIcon fontSize="small" />,
          sx: {
            backgroundColor: '#FF9800',
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#F57C00',
            },
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            boxShadow: 'none',
          },
          onClick: handleOpenModal,  // Open modal on add button click
        }}
        searchPlaceholder="Search leads..."
        categoryLabel="All Categories"
        statusLabel="All Statuses"
        disableEdit={false}
        disableDelete={false}
        disableView={false}
        showAssignColumn={true}
        tableProps={{
          sx: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              backgroundColor: '#F5F5F5',
              color: '#424242',
            },
            '& .MuiTableCell-body': {
              color: '#616161',
            },
            '& .MuiTableRow-root:hover': {
              backgroundColor: '#FAFAFA',
            },
          }
        }}
        assignButtonProps={{
          sx: {
            backgroundColor: '#FF9800',
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#F57C00',
            },
            textTransform: 'none',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            padding: '4px 12px',
          }
        }}
        statusSwitchProps={{
          sx: {
            '& .MuiSwitch-switchBase': {
              color: '#FFF',
              '&.Mui-checked': { color: '#FFF' },
              '&.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4CAF50' },
            },
            '& .MuiSwitch-track': { backgroundColor: '#F44336' },
          }
        }}
      />

      {/* Sleek, modern modal popup */}
      <Modal
        aria-labelledby="add-lead-modal-title"
        aria-describedby="add-lead-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backgroundColor: 'rgba(0,0,0,0.3)' }
          }
        }}
      >
        <Fade in={openModal}>
          <StyledModalBox>
            <Typography id="add-lead-modal-title" variant="h6" component="h2" gutterBottom>
              Add New Lead
            </Typography>
            <Stack spacing={2}>
              {/* Example input fields, keep styling consistent */}
              <TextField label="Enquiry No" variant="outlined" fullWidth size="small" />
              <TextField label="Lead Date" type="date" variant="outlined" fullWidth size="small" InputLabelProps={{ shrink: true }} />
              <TextField label="Lead Type" variant="outlined" fullWidth size="small" />
              <TextField label="Lead Source" variant="outlined" fullWidth size="small" />
              <TextField label="Prospect" variant="outlined" fullWidth size="small" />
              <TextField label="Mobile Number" variant="outlined" fullWidth size="small" />
              <TextField label="Assigned BDE" variant="outlined" fullWidth size="small" />
              <TextField label="Assigned CS" variant="outlined" fullWidth size="small" />
              <Box display="flex" justifyContent="flex-end" gap={2} pt={1}>
                <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleCloseModal}>Save</Button>
              </Box>
            </Stack>
          </StyledModalBox>
        </Fade>
      </Modal>
    </>
  );
};

export default LeadCapture;
