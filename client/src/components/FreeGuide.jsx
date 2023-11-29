import { Box, Button, Link } from "@mui/material";

const FreeGuide = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "2rem 20px",
        backgroundColor: "#efdaf0",
      }}
    >
      <Link href={`${import.meta.env.VITE_BASE_URL}/free-guide`}>
        <Button
          sx={{
            fontSize: {
              xs: "16px",
              md: "22px",
            },
            color: "#fff",
            padding: { xs: "1rem 1.5rem", md: "1.5rem 4rem" },
            borderRadius: "8px",
            maxWidth: "700px",
            backgroundColor: "#631d67",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#631d67",
            },
          }}
        >
          Download our free guide for 3 reasons why you're failing to manifest
          your desires
        </Button>
      </Link>
    </Box>
  );
};

export default FreeGuide;
