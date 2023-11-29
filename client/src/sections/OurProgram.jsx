import React from "react";
import { Box } from "@mui/material";
import { aboutTemplateData } from "../utils/constant";
import AboutTemplate2 from "../components/AboutTemplate2";

const OurProgram = ({}) => {
  const aboutTemplate2Data = aboutTemplateData?.find(
    (item) => item?.id === "become-your-creator"
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        background: "linear-gradient(#DCD9F0,#ffffff)",
      }}
    >
      <Box>
        <AboutTemplate2
          reverse={aboutTemplate2Data.reverse}
          image={aboutTemplate2Data.image}
          title={aboutTemplate2Data.title}
          content={aboutTemplate2Data.content}
          linkText={aboutTemplate2Data.linkText}
        />
      </Box>
    </Box>
  );
};

export default OurProgram;
