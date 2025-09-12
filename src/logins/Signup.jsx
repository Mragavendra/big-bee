import React from 'react';
import { useState } from "react";
import { register } from "../api/auth";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import leftImage from "../assets/leftside.png"; // Use your actual image path

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      setMessage("Please accept the Terms and Conditions");
      return;
    }
    try {
      const data = await register(email, password);
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        width: "100vw",
        overflow: "hidden",
        gap: 0,
        margin: 0,
        padding: 0,
      }}
    >
      {/* Left image side */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${leftImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          overflow: "hidden",
        }}
      />
      {/* Right form side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          p: 4,
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            borderRadius: 2,
            boxSizing: "border-box",
            backgroundColor: "transparent",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Email */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", mb: 1, color: "text.primary" }}
              >
                Email address*
              </Typography>
              <TextField
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                placeholder="Enter your email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f9fafb",
                    "&:hover fieldset": {
                      borderColor: "#ff5722",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5722",
                    },
                  },
                }}
              />
            </Box>

            {/* Password */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", mb: 1, color: "text.primary" }}
              >
                Password*
              </Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                placeholder="Enter your password"
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
                    backgroundColor: "#f9fafb",
                    pr: 1,
                    "&:hover fieldset": {
                      borderColor: "#ff5722",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5722",
                    },
                  },
                }}
              />
            </Box>

            {/* Confirm Password */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", mb: 1, color: "text.primary" }}
              >
                Confirm Password*
              </Typography>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                placeholder="Confirm your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f9fafb",
                    pr: 1,
                    "&:hover fieldset": {
                      borderColor: "#ff5722",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff5722",
                    },
                  },
                }}
              />
            </Box>

            {/* Terms checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{
                    color: "#ff5722",
                    "&.Mui-checked": {
                      color: "#ff5722",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  I agree to the{" "}
                  <Typography
                    component="span"
                    sx={{ color: "#ff5722", textDecoration: "underline", cursor: "pointer" }}
                  >
                    Terms and Conditions
                  </Typography>
                </Typography>
              }
            />

            {/* Register Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: "#ff5722",
                textTransform: "uppercase",
                fontWeight: "medium",
                letterSpacing: "0.05em",
                "&:hover": {
                  backgroundColor: "#e64a19",
                },
              }}
            >
              REGISTER
            </Button>

            {/* Message alert */}
            {message && (
              <Alert severity={message === "Error" ? "error" : "success"} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </Box>

          {/* BigBee Logo at bottom */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary", letterSpacing: "0.05em" }}
            >
              Bi
              <Typography component="span" sx={{ color: "#ff6b35", fontWeight: "bold" }}>
                GB
              </Typography>
              EE
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}