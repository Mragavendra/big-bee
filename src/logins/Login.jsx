import React from 'react'; 
import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import leftImage from "../assets/leftside.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const data = await login(email, password);
      console.log("Login response:", data);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", data.email);
      
      // Redirect based on user role
      if (data.role === 'admin') {
        navigate("/admin-dashboard");
      } else if (data.role === 'marketing') {
        navigate("/marketing-dashboard");
      } else if (data.role === 'businessanddevelopment') {
        navigate("/businessand-development-dashboard");
      } else {
        navigate("/marketing-dashboard"); // Default to marketing
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "#4a4a4a",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        gap: 0,
      }}
    >
      {/* Left Image Side */}
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          backgroundImage: `url(${leftImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          '@media (max-width: 900px)': {
            display: 'none'
          }
        }}
      />

      {/* Right Login Form Side */}
      <Box
        sx={{
          flex: 1,
          minWidth: '300px',
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          backgroundColor: "#fff",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: "bold", 
            mb: 4, 
            color: "#333",
            background: 'linear-gradient(45deg, #ff5722 30%, #ff8a65 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome Back
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}
          
          <TextField
            label="Email address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#ff5722" },
                "&.Mui-focused fieldset": { borderColor: "#ff5722" },
              },
            }}
          />
          
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#ff5722" },
                "&.Mui-focused fieldset": { borderColor: "#ff5722" },
              },
            }}
          />
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  disabled={loading}
                  sx={{ color: "#ff5722", "&.Mui-checked": { color: "#ff5722" } }}
                />
              }
              label="Keep me signed in"
            />
            
            <Typography
              variant="body2"
              sx={{
                color: "#ff5722",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline", },
              }}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Typography>
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#ff5722",
              color: "#fff",
              textTransform: "uppercase",
              padding: "12px",
              borderRadius: 2,
              "&:hover": { 
                backgroundColor: "#e64a19",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              },
              "&:disabled": {
                backgroundColor: "#ffab91"
              },
              transition: "all 0.2s ease-in-out"
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "LOGIN"
            )}
          </Button>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mt: 2, 
              color: "#757575",
              cursor: "pointer",
              "&:hover": { color: "#ff5722" }
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot your password?
          </Typography>
        </Box>
        
        {/* Demo credentials hint */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: '#757575', textAlign: 'center' }}>
            <strong>Demo:</strong><br />
            admin@gmail.com (Admin)<br />
            marketingteam@gmail.com (Marketing)<br />
            businessanddevelopmentteam@gmail.com (Business & Development)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}