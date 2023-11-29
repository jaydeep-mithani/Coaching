import { Box, Typography } from "@mui/material";
import TermOrCondition from "../../sections/TermOrCondition";
import { termsAndConditionsData } from "../../utils/constant";

const TermsAndConditions = () => {
  return (
    <>
      <Box
        sx={{
          height: "200px",
          backgroundColor: "whitesmoke",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "22px", sm: "30px", md: "35px" },
            textAlign: "center",
            color: "#671d61",
            fontWeight: "bold",
            fontFamily: "'montserrat', cursive",
          }}
        >
          Terms & Conditions
        </Typography>
      </Box>
      <Box
        sx={{
          padding: { xs: "20px", sm: "50px", md: "120px", lg: "0 22%" },
        }}
      >
        {termsAndConditionsData?.map((section, index) => (
          <TermOrCondition
            title={section?.title}
            key={index}
            bigHead={index === 0}
          >
            {section?.content}
          </TermOrCondition>
        ))}
      </Box>
    </>
  );
};

export default TermsAndConditions;
