import { Typography } from "@mui/material";

const TNCTitle = ({ children, bigHead }) => {
  return (
    <Typography
      paragraph
      sx={{
        position: "relative",
        fontSize: bigHead
          ? { xs: "1.2rem", sm: "1.7rem", md: "2.2rem" }
          : { xs: "0.9rem", sm: "1.25rem", md: "1.75rem" },
        color: "#671D63",
        padding: "12px 0",
        fontWeight: "900",
        borderBottom: "4px solid goldenrod",
        width: "max-width",
        textAlign: { xs: "left", sm: "justify" },
        zIndex: "-1",
      }}
    >
      {children}
    </Typography>
  );
};

export default TNCTitle;
