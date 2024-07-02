import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockIcon from "@mui/icons-material/Lock";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState } from "react";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";
import animationData from "../../assets/loginAnimation.json";

import Lottie from "lottie-react";

const Login = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const isLoggedIn = await authContext.login(loginData);

    if (isLoggedIn) {
      setIsLoading(false);
      navigate("/ohcSelection");
      navigate("/roleSelection");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={0} direction="row">
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          overflow: "hidden",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box sx={{ marginTop: "60px" }}>
          <Lottie  animationData={animationData} loop={false} />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              bgcolor: "background.paper",
            }}
          >
            <img
              src="/logo.svg"
              alt="logo"
              style={{ width: "150px", height: "50px" }}
            />
            <Typography variant="h6" gutterBottom>
              Occupational Health System
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={handleFieldChange}
                value={loginData.username}
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <Box sx={{ cursor: "pointer" }}>
                      <Avatar
                        variant="circular"
                        sx={{ bgcolor: "cornflowerblue" }}
                      >
                        <InsertEmoticonIcon />
                      </Avatar>
                    </Box>
                  ),
                }}
              />
              <TextField
                onChange={handleFieldChange}
                value={loginData.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <Box sx={{ cursor: "pointer" }}>
                      <Avatar
                        variant="circular"
                        sx={{ bgcolor: "cornflowerblue" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <LockOpenIcon /> : <LockIcon />}
                      </Avatar>
                    </Box>
                  ),
                }}
              />
              {!isLoading && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 ,bgcolor:"cornflowerblue"}}
                  onClick={handleSubmit}
               
                >
                  Sign In
                </Button>
              )}
              {isLoading && <LinearProgress />}
            </Box>
          </Box>
        </Container>
      </Box>
    </Stack>
  );
};

export default Login;
