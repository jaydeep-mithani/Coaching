import { Box, Typography } from "@mui/material";
import TNCTitle from "../components/TNCTitle";

const TermOrCondition = ({ title, children, bigHead }) => {
  return (
    <Box sx={{ padding: "20px 0" }}>
      <TNCTitle bigHead={bigHead}>{title}</TNCTitle>
      <Typography
        paragraph
        sx={{
          color: "#000",
          textAlign: {
            xs: "left",
            sm: "justify",
            span: { display: "block", marginBottom: "1rem" },
          },
        }}
        dangerouslySetInnerHTML={{
          __html: children,
        }}
      ></Typography>
    </Box>
  );
};

export default TermOrCondition;
