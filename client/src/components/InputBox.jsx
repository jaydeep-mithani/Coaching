import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

export const InputBox = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (props.type === "password") {
    return (
      <>
        <Box sx={{ position: "relative" }}>
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            sx={{ position: "absolute", top: "8px", right: "10px", zIndex: 11 }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <TextField
            sx={{
              margin: "0 0 20px 0",
              "& label.Mui-focused": {
                color: "#671d63",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#671d63",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid",
                  borderColor: "#671d63",
                },
                zIndex: 1,
              },
            }}
            {...props}
            type={showPassword ? "text" : "password"}
          />
        </Box>
      </>
    );
  }

  return (
    <TextField
      sx={{
        margin: "0 0 20px 0",
        "& label.Mui-focused": {
          color: "#671d63",
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "#671d63",
          },
          "&.Mui-focused fieldset": {
            border: "1px solid",
            borderColor: "#671d63",
          },
        },
      }}
      {...props}
    />
  );
};
