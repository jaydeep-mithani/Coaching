import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        maxWidth: "500px",
        padding: "20px",
        img: { maxWidth: "100%", mb: "16px" },
        mx: "auto",
        mb: "2rem",
        textAlign: "center",
        a: {
          textDecoration: "none",
          backgroundColor: "#631d67",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: { xs: "14px", lg: "20px" },
        },
      }}
    >
      <img src="./404.png" alt="page not found" />
      <Link to="/">Go back to home page</Link>
    </Box>
  );
};

export default NotFound;
