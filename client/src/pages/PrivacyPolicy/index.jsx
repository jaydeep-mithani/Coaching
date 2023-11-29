import React from "react";
import { Box, Typography } from "@mui/material";
import { privacyPolicyData } from "../../utils/constant";

const PrivacyPolicy = () => {
  return (
    <Box>
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
          Privacy Policy - Become Your Creator.
        </Typography>
      </Box>

      <Box
        sx={{ padding: { xs: "20px", sm: "50px", md: "120px", lg: "0 22%" } }}
      >
        {privacyPolicyData?.map((data) => (
          <Box key={data?.key} sx={{ padding: "20px 0" }}>
            {data?.title && (
              <Typography
                paragraph
                sx={{
                  position: "relative",
                  fontSize: { xs: "0.9rem", sm: "1.25rem", md: "1.75rem" },
                  color: "#671D63",
                  padding: "12px 0",
                  fontWeight: "900",
                  borderBottom: "4px solid goldenrod",
                  width: "max-width",
                  textAlign: { xs: "left", sm: "justify" },
                  zIndex: "-1",
                }}
              >
                {data?.title}
              </Typography>
            )}
            <Box>
              {data?.content?.map((para) => (
                <Typography
                  paragraph
                  key={para}
                  sx={{
                    fontSize: "1rem",
                    textAlign: { xs: "left", sm: "justify" },
                    fontWeight: "100",
                    marginBottom: "16px",
                  }}
                >
                  {para}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
