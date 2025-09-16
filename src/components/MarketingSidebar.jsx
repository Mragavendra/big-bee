import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";
import bigBeeLogo from "../assets/big-beelogo.svg";

const MarketingSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  // Marketing menu sections (limited access)
  const marketingMenuSections = [
    {
      title: "Main menu",
      items: [{ text: "Dashboard", path: "/marketing-dashboard", icon: DashboardIcon }],
    },
    {
      title: "Marketing Tools",
      items: [
        { text: "Lead Capture", path: "/lead-capture", icon: PeopleIcon },
        { text: "Marketing ROI", path: "/marketing-roi", icon: TrendingUpIcon },
        { text: "Campaign Analytics", path: "/funnel-review", icon: AnalyticsIcon },
      ],
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100vh",
        width: 280,
        overflow: "auto",
        borderRight: "1px solid #E5E5E5",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #F0F0F0",
          mb: 2,
        }}
      >
        <img
          src={bigBeeLogo}
          alt="BigBee Logo"
          style={{ height: "44px", userSelect: "none" }}
        />
        <Typography variant="h6" sx={{ ml: 1, color: "#FF6A00", fontSize: "0.9rem" }}>
          Marketing
        </Typography>
      </Box>

      {/* Marketing Content */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {marketingMenuSections.map((section) => (
          <Box key={section.title} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                display: "block",
                px: 3,
                pb: 1,
                color: "#666",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              {section.title}
            </Typography>
            <List dense disablePadding>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      selected={isActive}
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        px: 3,
                        py: 1,
                        transition: "all 0.25s ease",
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                          transform: "translateX(4px)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#f2f2f2",
                          borderLeft: "3px solid #FF6A00",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? "#FF6A00" : "#999",
                          minWidth: 36,
                        }}
                      >
                        <IconComponent fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#000" : "#333",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* Bottom: Logout */}
      <Box sx={{ borderTop: "1px solid #F0F0F0" }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#999" }}>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Log Out"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  color: "#000000ff",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default MarketingSidebar;