import { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const FAQAccordion = ({ data }) => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container
      sx={{
        padding: "4rem 2rem",
      }}
    >
      <Typography
        className="borderTitle"
        variant="span"
        sx={{
          position: "relative",
          fontSize: { xs: "32px", sm: "48px" },
          color: "#671d63",
          lineHeight: "50px",
          fontFamily: "'montserrat', sans-serif",
          display: "flex",
          marginBottom: { xs: "50px", md: "75px" },
          justifyContent: { xs: "center", md: "flex-start" },
          marginRight: { xs: "0px", md: "230px" },
          "::before": {
            position: "absolute",
            bottom: { xs: "-18px", md: "-25px" },
            color: "black",
            content: `""`,
            height: "3px",
            width: "50px",
            backgroundColor: "#000",
          },
        }}
      >
        FAQs
      </Typography>
      <Box
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        {data?.map((item, index) => (
          <Accordion
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            key={index}
            sx={{
              border: "none",
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id={`panel${index + 1}d-header`}
              sx={{
                backgroundColor: "#f9f6f9",
                color: "#671d63",
              }}
            >
              <Typography>{item?.summary}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#fff", color: "#000" }}>
              <Typography>{item?.details}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQAccordion;
