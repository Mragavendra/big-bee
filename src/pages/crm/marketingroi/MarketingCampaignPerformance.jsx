import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const MarketingCampaignPerformance = () => {
  const [formData, setFormData] = useState({
    date: "LED044",
    month: "20-06-2025",
    company: "",
    campaignType: "",
    typeOfAdvertising: "",
    marketingChannel: "",
    budgetSpent: "",
    leadsGenerated: "",
    conversions: "",
    revenueGenerated: "",
    activeStatus: true,
  });

  // Placeholder for calculated metrics
  const metrics = {
    costPerLead: "1052",
    costPerConversion: "1,730",
    roi: "-100",
    roas: "0",
    conversionRate: "0",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (event) => {
    setFormData((prev) => ({ ...prev, activeStatus: event.target.checked }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Form saved:", formData);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Edit Funnel Tracker
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff6b35",
            "&:hover": { backgroundColor: "#e55a2b" },
            borderRadius: 20,
            textTransform: "none",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Performance Metrics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Cost per Lead (₹)
            </Typography>
            <Typography variant="h6">{metrics.costPerLead}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Cost per Conversion (₹)
            </Typography>
            <Typography variant="h6">{metrics.costPerConversion}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              ROI (%)
            </Typography>
            <Typography variant="h6">{metrics.roi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Return on Ad Spent(ROAS)
            </Typography>
            <Typography variant="h6">{metrics.roas}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Conversion Rate (%)
            </Typography>
            <Typography variant="h6">{metrics.conversionRate}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              1. Campaign Info
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Date
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Month
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="month"
                value={formData.month}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Company
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="company-label">Select</InputLabel>
                <Select
                  labelId="company-label"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  label="Select"
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add options as needed */}
                  <MenuItem value="Bigbee Experience">Bigbee Experience</MenuItem>
                  <MenuItem value="Kajja Communication">Kajja Communication</MenuItem>
                  <MenuItem value="GiftBees">GiftBees</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Campaign Type
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="campaign-type-label">Select</InputLabel>
                <Select
                  labelId="campaign-type-label"
                  name="campaignType"
                  value={formData.campaignType}
                  onChange={handleChange}
                  label="Select"
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add options as needed */}
                  <MenuItem value="Lead Generation">Lead Generation</MenuItem>
                  <MenuItem value="Brand Awareness">Brand Awareness</MenuItem>
                  <MenuItem value="Sales Conversion">Sales Conversion</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Types of Advertising
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="advertising-type-label">Select</InputLabel>
                <Select
                  labelId="advertising-type-label"
                  name="typeOfAdvertising"
                  value={formData.typeOfAdvertising}
                  onChange={handleChange}
                  label="Select"
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add options as needed */}
                  <MenuItem value="Paid Advertising">Paid Advertising</MenuItem>
                  <MenuItem value="Display Ads">Display Ads</MenuItem>
                  <MenuItem value="Search Ads">Search Ads</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Marketing Channels
              </Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="marketing-channel-label">Select</InputLabel>
                <Select
                  labelId="marketing-channel-label"
                  name="marketingChannel"
                  value={formData.marketingChannel}
                  onChange={handleChange}
                  label="Select"
                >
                  <MenuItem value="">Select</MenuItem>
                  {/* Add options as needed */}
                  <MenuItem value="Social Media">Social Media</MenuItem>
                  <MenuItem value="Google Ads">Google Ads</MenuItem>
                  <MenuItem value="Google Search">Google Search</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Core Spend & Result Metrics
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Budget Spent (₹)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="budgetSpent"
                value={formData.budgetSpent}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Leads Generated
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="leadsGenerated"
                value={formData.leadsGenerated}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Conversions (Sales)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="conversions"
                value={formData.conversions}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Revenue Generated (₹)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="revenueGenerated"
                value={formData.revenueGenerated}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Box>
          </Paper>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Control:
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.activeStatus}
                  onChange={handleSwitchChange}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#ff6b35",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#ff6b35",
                    },
                  }}
                />
              }
              label="Active Status*"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketingCampaignPerformance;