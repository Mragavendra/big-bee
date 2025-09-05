import React, { useState, ReactNode } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Chip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

const drawerWidth = 280;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white', 
  '&:hover': {
    backgroundColor: 'white', 
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // State and handlers for notification modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Conditionally show sidebar and adjust layout based on route
  const showSidebar = location.pathname !== '/' && location.pathname !== '/signup';
  const appBarTitle = location.pathname === '/' || location.pathname === '/signup' ? 'Login' : 'Dashboard';

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {showSidebar && (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: '#F9F4EF',
              color: 'text.primary',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                {appBarTitle}
              </Typography>
              <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
                Hello, welcome back!
              </Typography>
              <Search sx={{ display: { xs: 'none', md: 'block' } }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search anything"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <IconButton
                color="inherit"
                sx={{
                  ml: { xs: 1, md: 2 },
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <Badge badgeContent={1} color="error">
                  <NotificationsIcon
                    sx={{ color: 'text.secondary', cursor: 'pointer' }}
                    onClick={handleOpen}
                  />
                </Badge>
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 1, md: 2 } }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 32,
                    height: 32,
                    fontSize: '0.875rem',
                  }}
                >
                  RG
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    ml: 1,
                    fontWeight: 500,
                    display: { xs: "none", sm: "block" },
                    cursor: "pointer"
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Raghavv 😎
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              <Sidebar />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              <Sidebar />
            </Drawer>
          </Box>
        </>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: showSidebar ? 3 : 0,
          width: showSidebar ? { sm: `calc(100% - ${drawerWidth}px)` } : { sm: '100%' },
          height: '100%',
          overflow: 'hidden', // Prevent external scrolling
          backgroundColor: showSidebar ? '#F9F5EF' : 'white',
        }}
      >
        <Box sx={{ height: '100%', overflow: 'hidden' }}>{children}</Box> {/* Remove internal auto scroll unless needed */}
      </Box>

      {/* Notification modal dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Notifications</span>
              <Chip 
                label="5 New" 
                color="error" 
                size="small" 
                variant="filled"
              />
            </div>
            <Button 
              variant="text" 
              size="small"
              onClick={() => console.log('Mark all as read')}
              className="text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </Button>
          </div>
        </DialogTitle>
        
        <DialogContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {/* High Priority Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-semibold text-red-700">
                      System Alert
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      2 min ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-700 mt-1">
                    Server maintenance scheduled for tonight at 11:00 PM. Expected downtime: 30 minutes.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Critical" color="error" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-500">
                      IT Department
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-semibold text-blue-700">
                      Event Reminder
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      15 min ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-700 mt-1">
                    "Annual Tech Conference 2025" starts in 2 hours. Don't forget to check-in at the venue.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Event" color="primary" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-500">
                      Event Management
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* KRA/Performance Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-semibold text-orange-700">
                      KRA Review Pending
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      1 hour ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-700 mt-1">
                    Your manager has requested review for July 2025 KRA. Please complete the self-assessment.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Action Required" color="warning" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-500">
                      Priya Menon
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-semibold text-green-700">
                      Request Approved
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      2 hours ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-700 mt-1">
                    Your leave request for March 20-22, 2025 has been approved by your manager.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Approved" color="success" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-500">
                      HR Department
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-semibold text-purple-700">
                      Team Update
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      3 hours ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-700 mt-1">
                    New team member Sarah Johnson has joined the Project Management department.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Team" color="secondary" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-500">
                      Team Lead
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Read Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer opacity-60">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-medium text-gray-600">
                      System Update
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      1 day ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-600 mt-1">
                    New features have been added to the dashboard. Check out the updated interface.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Info" color="default" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-400">
                      Product Team
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Birthday/Anniversary Notifications */}
            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer opacity-60">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2" className="font-medium text-gray-600">
                      Birthday Reminder
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      1 day ago
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-600 mt-1">
                    It's Alex Thompson's birthday today! Don't forget to wish them.
                  </Typography>
                  <div className="flex items-center gap-2 mt-2">
                    <Chip label="Personal" color="default" size="small" variant="outlined" />
                    <Typography variant="caption" className="text-gray-400">
                      HR Department
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Empty state if no notifications */}
          {/* Uncomment this and comment above notifications if you want empty state
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM9 14h6m-6-4h6m-6-4h6M6 4h12a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z" />
              </svg>
            </div>
            <Typography variant="h6" className="text-gray-500 mb-2">
              No New Notifications
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              You're all caught up! Check back later for updates.
            </Typography>
          </div>
          */}
        </DialogContent>
        
        <DialogActions className="px-4 pb-4 pt-2 border-t bg-gray-50">
          <Button 
            variant="text" 
            onClick={() => console.log('View all notifications')}
            className="text-blue-600"
          >
            View All Notifications
          </Button>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Layout;