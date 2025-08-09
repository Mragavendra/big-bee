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
  NotificationsNone as NotificationIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Notifications as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Label as LabelIcon,
  Source as SourceIcon,
  Category as CategoryIcon,
  PlayArrow as ActionIcon,
  CheckCircle as StatusIcon,
  Forum as FollowUpIcon,
  Business as CompanyIcon,
  RoomService as ServicesIcon,
  Campaign as CampaignIcon,
  Campaign as AdsIcon,   // using Campaign icon for Ads
  Public as MarketingIcon // using Public icon for Marketing
} from "@mui/icons-material";
import bigBeeLogo from "../assets/big-beelogo.svg";

// --- Main menu sections ---
const menuSections = [
  {
    title: "Main menu",
    items: [{ text: "Dashboard", path: "/dashboard" }],
  },
  {
    title: "CRM",
    items: [
      { text: "Lead Capture", path: "/lead-capture" },
      { text: "Funnel Review", path: "/funnel-review" },
      { text: "Marketing ROI Tracker", path: "/marketing-roi" },
      { text: "Order", path: "/order" },
    ],
  },
  {
    title: "Performance & Activity",
    items: [
      { text: "KRA", path: "/kra" },
      { text: "Meeting", path: "/meeting" },
    ],
  },
  {
    title: "Project Financials",
    items: [
      { text: "Profitability Analysis", path: "/profitability-analysis" },
      { text: "Financial MIS", path: "/financial-mis" },
    ],
  },
];

// --- Settings menu only for /settings pages ---
const settingsMenu = [
  {
    label: "Exit Master",
    path: "/dashboard",
    icon: ArrowBackIcon,
  },
];

// --- Masters section inside Settings ---
const mastersItems = [
  { label: "Employee Master", path: "/settings/employee-master", icon: PersonIcon },
  { label: "Designation", path: "/settings/designation", icon: WorkIcon },
  { label: "Department", path: "/settings/department", icon: BusinessIcon },
  { label: "Lead Type", path: "/settings/lead-type", icon: LabelIcon },
  { label: "Lead Source", path: "/settings/lead-source", icon: SourceIcon },
  { label: "Category", path: "/settings/category", icon: CategoryIcon },
  { label: "Action", path: "/settings/action", icon: ActionIcon },
  { label: "Status", path: "/settings/status", icon: StatusIcon },
  { label: "Follow Up Mode", path: "/settings/follow-up-mode", icon: FollowUpIcon },
  { label: "Company", path: "/settings/company", icon: CompanyIcon },
  { label: "Services", path: "/settings/services", icon: ServicesIcon },
  { label: "Campaign Type", path: "/settings/campaign-type", icon: CampaignIcon },
  { label: "Type of Advertising", path: "/settings/type-of-advertising", icon: AdsIcon },
  { label: "Marketing Channel", path: "/settings/marketing-channel", icon: MarketingIcon },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith("/settings");

  const handleNavigation = (path) => {
    navigate(path);
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
      </Box>

      {isSettingsPage ? (
        /* --- SETTINGS VIEW --- */
        <Box>
          {/* Exit Master */}
          <List dense disablePadding>
            {settingsMenu.map((item) => {
              const IconComp = item.icon;
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{ px: 3, py: 1 }}
                  >
                    <ListItemIcon sx={{ color: "#999", minWidth: 36 }}>
                      <IconComp fontSize="small" />
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

          {/* Masters section */}
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
                const IconComp = item.icon;
                return (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton
                      selected={isActive}
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        px: 3,
                        py: 1,
                        "&.Mui-selected": {
                          backgroundColor: "rgba(255, 106, 0, 0.08)",
                          borderRight: "3px solid #FF6A00",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? "#FF6A00" : "#999",
                          minWidth: 36,
                        }}
                      >
                        <IconComp fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#FF6A00" : "#333",
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
                <ListItemButton onClick={() => navigate("/logout")} sx={{ px: 3, py: 1 }}>
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
        /* --- MAIN MENU VIEW --- */
        <>
          {menuSections.map((section) => (
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
                  return (
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton
                        selected={isActive}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <ListItemIcon
                          sx={{ color: isActive ? "#FF6A00" : "#999" }}
                        >
                          <NotificationIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            fontSize: "0.875rem",
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? "#FF6A00" : "#333",
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
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation("/settings")}
                  selected={location.pathname.startsWith("/settings")}
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
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#999" }}>
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
        </>
      )}
    </Box>
  );
};

export default Sidebar;
