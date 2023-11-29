import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const SuccessModal = ({
  open,
  handleClose,
  title,
  message,
  status = "success",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      let timer = setTimeout(() => {
        handleClose();
      }, 5000);

      // Update progress every 30ms (adjust the interval as needed)
      const interval = 30;
      const step = 100 / (5000 / interval);
      let currentProgress = 0;

      const updateProgress = () => {
        currentProgress += step;
        setProgress(currentProgress);
        if (currentProgress < 100) {
          setTimeout(updateProgress, interval);
        }
      };

      // Start updating progress
      updateProgress();

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          borderRadius: "15px",
        }}
      >
        <DialogTitle>
          {status === "cancelled" && (
            <Box
              sx={{
                perspective: "500px",
                maxWidth: "fit-content",
                paddingBottom: "0.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  transition: "transform 1s",
                  transformStyle: "preserve-3d",
                  "@keyframes flip": {
                    "0%": {
                      transform: "rotateY( 0deg ) scale(1)",
                    },
                    "50%": {
                      transform: "rotateY( 540deg ) scale(1.2)",
                    },
                    "100%": {
                      transform: "rotateY( 1080deg ) scale(1)",
                    },
                  },
                  animation: open && "flip 2s ease 250ms 1",
                }}
              >
                <CancelOutlinedIcon
                  sx={{
                    fontSize: { xs: "1.5rem", md: "3rem" },
                    color: "#f00",
                    backgroundColor: "#ff000022",
                    borderRadius: "50px",
                  }}
                />
              </Box>
            </Box>
          )}
          {status === "success" && (
            <Box
              sx={{
                perspective: "500px",
                maxWidth: "fit-content",
                paddingBottom: "0.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  transition: "transform 1s",
                  transformStyle: "preserve-3d",
                  "@keyframes flip": {
                    "0%": {
                      transform: "rotateY( 0deg ) scale(1)",
                    },
                    "50%": {
                      transform: "rotateY( 540deg ) scale(1.2)",
                    },
                    "100%": {
                      transform: "rotateY( 1080deg ) scale(1)",
                    },
                  },
                  animation: open && "flip 2s ease 250ms 1",
                }}
              >
                <CheckCircleIcon
                  sx={{ fill: "limegreen", width: "40px", height: "40px" }}
                />
              </Box>
            </Box>
          )}
          {title && (
            <Typography
              sx={{
                fontSize: { xs: "1.2rem", md: "2rem" },
              }}
            >
              {title}
            </Typography>
          )}
        </DialogTitle>
        {message && (
          <DialogContent sx={{ padding: "10px 25px" }}>
            <DialogContentText sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
              {message}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions sx={{ padding: "10px 25px" }}>
          <Button
            sx={{
              color: "#673d61",
              mt: "1rem",
              border: "1px solid #673d61",
              padding: "5px 25px",
            }}
            onClick={handleClose}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
        <LinearProgress
          variant={progress === 100 ? "determinate" : "indeterminate"}
          value={progress}
          sx={{ color: "#673d61", mt: "1rem", mb: "1px" }}
        />
      </Box>
    </Dialog>
  );
};

export default SuccessModal;
