import { useState } from "react";
import {
  Box,
  InputBase,
  Typography,
  InputAdornment,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PrimaryBtn } from "../components/PrimaryBtn";
import { validationEmail } from "../utils/validation";
import { useSnackbar } from "notistack";
import { freeMeditation } from "../services/contact.service";

const FreeMeditation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    validationSchema: validationEmail,
    onSubmit: async (values) => {
      await setIsLoading(true);
      await freeMeditation({ email: values.email })
        .then((res) => {
          if (res?.status === 200) {
            enqueueSnackbar(
              <Box
                sx={{
                  span: {
                    fontSize: { sm: "10px", md: "12px" },
                    color: "#fff",
                    padding: "1px 5px 1px 0",
                    borderRadius: "2px",
                    fontWeight: 900,
                  },
                }}
              >
                {res?.data?.message}
                <br />
                <span>NOTE: {res?.data?.note}</span>
              </Box>,
              { variant: "success", autoHideDuration: 7000 }
            );
          } else {
            enqueueSnackbar(res?.message, {
              variant: "error",
            });
          }
        })
        .catch((error) => {
          enqueueSnackbar(
            "Oops! Something went wrong. Please try again later.",
            {
              variant: "error",
            }
          );
        });
      await formik.resetForm();
      await setIsLoading(false);
    },
  });

  return (
    <Box
      sx={{
        mx: "auto",
        padding: "6rem 0",
        backgroundColor: "#f9f6f9",
      }}
    >
      <Box
        sx={{
          marginInline: "auto",
          width: "100%",
        }}
      >
        <Typography
          component={"h4"}
          sx={{
            fontSize: { xs: "32px", sm: "48px" },
            color: "#671d63",
            lineHeight: "48px",
            fontFamily: "'montserrat', sans-serif",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Free Meditation
        </Typography>
        <Typography
          component={"p"}
          sx={{
            fontSize: "22px",
            textAlign: "center",
            color: "#2b2b2b",
            marginBottom: "10px",
            padding: "20px",
          }}
        >
          Sign up with us to receive free meditation
        </Typography>
        <Box sx={{ mx: "auto" }}>
          <form onSubmit={formik.handleSubmit}>
            <Paper
              sx={{
                backgroundColor: "white",
                borderRadius: "100px",
                borderColor: "transparent",
                mx: "auto",
                paddingLeft: "25px",
                width: { xs: "80%", md: "40%" },
              }}
            >
              <InputBase
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={true}
                error={formik.touched.email && Boolean(formik.errors.email)}
                sx={{
                  paddingY: "20px",
                  paddingX: "5px",
                  backgroundColor: "transparent",
                  borderRadius: "100px",
                  width: "100%",
                }}
                placeholder="Email Address Here"
                endAdornment={
                  <InputAdornment position="end">
                    <PrimaryBtn
                      type="submit"
                      sx={{
                        background: "linear-gradient(#f2d9de, #793473)",
                        color: "white",
                        borderRadius: "50%",
                        padding: "20px",
                        fontSize: "40px",
                      }}
                    >
                      {!isLoading ? (
                        <ArrowForwardIcon />
                      ) : (
                        <CircularProgress
                          sx={{
                            color: "#fff",
                            maxWidth: "20px",
                            maxHeight: "20px",
                          }}
                        />
                      )}
                    </PrimaryBtn>
                  </InputAdornment>
                }
              />
            </Paper>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default FreeMeditation;
