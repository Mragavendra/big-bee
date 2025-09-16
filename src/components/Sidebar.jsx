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
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  ShowChart as ShowChartIcon,
  MeetingRoom as MeetingRoomIcon,
  AttachMoney as AttachMoneyIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import bigBeeLogo from "../assets/big-beelogo.svg";

// Main menu sections for Admin
const adminMenuSections = [
  {
    title: "Main menu",
    items: [{ text: "Dashboard", path: "/admin-dashboard", icon: DashboardIcon }],
  },
  {
  title: "CRM",
  items: [
    { text: "Lead Capture", path: "/lead-capture", icon: PeopleIcon },
    { text: "Funnel Review", path: "/funnel-review", icon: AnalyticsIcon },
    { text: "Marketing ROI Tracker", path: "/marketing-roi", icon: AssessmentIcon },
    { text: "Order", path: "/order", icon: AssessmentIcon },
  ],
},
{
  title: "Performance & Activity",
  items: [
    { text: "KRA", path: "/kra", icon: ShowChartIcon },
    { text: "Meeting", path: "/meeting", icon: MeetingRoomIcon },
  ],
},
{
  title: "Project Financials",
  items: [
    { text: "Profitability Analysis", path: "/profitability-analysis", icon: AttachMoneyIcon },
    { text: "Financial MIS", path: "/financial-mis", icon: AssessmentIcon },
    { text: "Performance MIS", path: "/performance-mis", icon: AnalyticsIcon },
  ],
},
];

// Main menu sections for Marketing (only 2-3 items)
const marketingMenuSections = [
  {
    title: "Marketing Menu",
    items: [
      { text: "Dashboard", path: "/marketing-dashboard", icon: DashboardIcon },
    ],
  },
  {
    title: "CRM",
    items: [
      { text: "Lead Capture", path: "/marketing-lead-capture", icon: PeopleIcon },
      { text: "Funnel Review", path: "/marketing-funnel-review", icon: AnalyticsIcon },
      { text: "Marketing ROI Tracker", path: "/Marketing-ROI-Tracker", icon: AnalyticsIcon },
      { text: "Order", path: "/Marketing-Order", icon: AnalyticsIcon },
    ],
  },
  {
    title: "Performance & Activity",
    items: [
      { text: "KRA", path: "/marketing-KRA", icon: PeopleIcon },
      { text: "Meeting", path: "/marketing-Meeting", icon: AnalyticsIcon },
    ],
  },
];

// Settings menu
const settingsMenu = [
  {
    label: "Exit Master",
    path: "/admin-dashboard",
    icon: ArrowBackIcon,
  },
];

// Masters section
const mastersItems = [
  { label: "Employee Master", path: "/settings/employee-master", icon: PeopleIcon },
  { label: "Designation", path: "/settings/designation", icon: PeopleIcon },
  { label: "Department", path: "/settings/department", icon: PeopleIcon },
  { label: "Lead Type", path: "/settings/lead-type", icon: PeopleIcon },
  { label: "Lead Source", path: "/settings/lead-source", icon: PeopleIcon },
  { label: "Category", path: "/settings/category", icon: PeopleIcon },
  { label: "Action", path: "/settings/action", icon: PeopleIcon },
  { label: "Status", path: "/settings/status", icon: PeopleIcon },
  { label: "Follow Up Mode", path: "/settings/follow-up-mode", icon: PeopleIcon },
  { label: "Company", path: "/settings/company", icon: PeopleIcon },
  { label: "Services", path: "/settings/services", icon: PeopleIcon },
  { label: "Campaign Type", path: "/settings/campaign-type", icon: PeopleIcon },
  { label: "Type of Advertising", path: "/settings/type-of-advertising", icon: PeopleIcon },
  { label: "Marketing Channel", path: "/settings/marketing-channel", icon: PeopleIcon },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith("/settings");
  
  // Get user role from localStorage
  const userRole = localStorage.getItem('userRole') || 'marketing';
  const isMarketingUser = userRole === 'marketing';

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

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
        </Typography>
      </Box>
      {isSettingsPage ? (
        // Settings menu view (same for all users)
        <Box>
          {/* Exit Master */}
          <List dense disablePadding>
            {settingsMenu.map((item) => {
              const IconComponent = item.icon;
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      px: 3,
                      py: 1,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        backgroundColor: "#f9f9f9",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#999", minWidth: 36 }}>
                      <IconComponent fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        color: "#333",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Masters submenu */}
          <Box sx={{ mt: 2 }}>
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
              Masters
            </Typography>
            <List dense disablePadding>
              {mastersItems.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <ListItem key={item.path} disablePadding>
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
                        primary={item.label}
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

          {/* Log Out */}
          <Box sx={{ mt: 2, borderTop: "1px solid #F0F0F0", pt: 1 }}>
            <List dense disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    px: 3,
                    py: 1,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#999", minWidth: 36 }}>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Log Out"
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      color: "#333",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      ) : (
        // Main menu view (different based on role)
        <>
          {(isMarketingUser ? marketingMenuSections : adminMenuSections).map((section) => (
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

            {/* Bottom: Settings + Logout */}
            <Box sx={{ mt: "auto", borderTop: "1px solid #F0F0F0" }}>
              <List disablePadding>
                {/* Hide Settings for marketing users */}
                {!isMarketingUser && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation("/settings/employee-master")}
                      selected={location.pathname.startsWith("/settings")}
                      sx={{
                        transition: "all 0.25s ease",
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: location.pathname.startsWith("/settings") ? "#FF6A00" : "#999",
                        }}
                      >
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Settings"
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: location.pathname.startsWith("/settings") ? 500 : 400,
                          color: location.pathname.startsWith("/settings") ? "#FF6A00" : "#333",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

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
          </>
        )}
      </Box>
    );
  };

  export default Sidebar;