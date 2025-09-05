
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import leftImage from "../assets/leftside.png"; // Adjust path accordingly

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || "Error");
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
        gap: 0, // no gap between flex items
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
        }}
      />

      {/* Right Login Form Side */}
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4, color: "#333" }}
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 300,
            width: "100%",
          }}
        >
          <TextField
            label="Email address*"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#ff5722" },
                "&.Mui-focused fieldset": { borderColor: "#ff5722" },
              },
            }}
          />
          <TextField
            label="Password*"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                sx={{ color: "#ff5722", "&.Mui-checked": { color: "#ff5722" } }}
              />
            }
            label="Keep me signed in"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#ff5722",
              color: "#fff",
              textTransform: "uppercase",
              padding: "10px",
              borderRadius: 8,
              "&:hover": { backgroundColor: "#e64a19" },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
