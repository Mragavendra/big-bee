import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material';

const initialFormData = {
  prospect: '',
  contactPerson: '',
  emailId: '',
  mobileNumber: '',
  department: '',
  designation: '',
  bde: '',
  clientServicingPerson: '',
  addressLine1: '',
  state: '',
  city: '',
  pincode: '',
  activeStatus: true,
};

const AddLeadForm = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSwitchChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    setFormData(initialFormData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Add Lead
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Prospect"
              placeholder="Enter Description"
              value={formData.prospect}
              onChange={handleInputChange('prospect')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>BDE</InputLabel>
              <Select
                value={formData.bde}
                onChange={handleSelectChange('bde')}
                label="BDE"
              >
                <MenuItem value="anand-kumar">Anand Kumar</MenuItem>
                <MenuItem value="priya-menon">Priya Menon</MenuItem>
                <MenuItem value="rajesh-sharma">Rajesh Sharma</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Person"
              placeholder="Enter Description"
              value={formData.contactPerson}
              onChange={handleInputChange('contactPerson')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Client Servicing Person</InputLabel>
              <Select
                value={formData.clientServicingPerson}
                onChange={handleSelectChange('clientServicingPerson')}
                label="Client Servicing Person"
              >
                <MenuItem value="anand-kumar">Anand Kumar</MenuItem>
                <MenuItem value="priya-menon">Priya Menon</MenuItem>
                <MenuItem value="rajesh-sharma">Rajesh Sharma</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email ID*"
              placeholder="Enter Email address"
              type="email"
              value={formData.emailId}
              onChange={handleInputChange('emailId')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number*"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange('mobileNumber')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleInputChange('department')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={handleInputChange('designation')}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Address
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address line 1"
              placeholder="Enter Description"
              value={formData.addressLine1}
              onChange={handleInputChange('addressLine1')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>State*</InputLabel>
              <Select
                value={formData.state}
                onChange={handleSelectChange('state')}
                label="State*"
              >
                <MenuItem value="karnataka">Karnataka</MenuItem>
                <MenuItem value="maharashtra">Maharashtra</MenuItem>
                <MenuItem value="tamil-nadu">Tamil Nadu</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>City*</InputLabel>
              <Select
                value={formData.city}
                onChange={handleSelectChange('city')}
                label="City*"
              >
                <MenuItem value="bangalore">Bangalore</MenuItem>
                <MenuItem value="mumbai">Mumbai</MenuItem>
                <MenuItem value="chennai">Chennai</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Pincode*"
              placeholder="Enter Pincode"
              value={formData.pincode}
              onChange={handleInputChange('pincode')}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Control:
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.activeStatus}
                    onChange={handleSwitchChange('activeStatus')}
                    color="primary"
                  />
                }
                label="Active Status*"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeadForm;
