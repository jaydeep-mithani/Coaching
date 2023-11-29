import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { InputBox } from "../components/InputBox";
import { PrimaryBtn } from "../components/PrimaryBtn";
import { validationContact } from "../utils/validation";
import { contact } from "../services/contact.service";

const ContactForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmit, setIsSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      contact: "",
      email: "",
      message: "",
    },
    enableReinitialize: true,
    validationSchema: validationContact,
    onSubmit: (values) => {
      const data = {
        name: values.fullname,
        email: values.email,
        contactNo: values.contact,
        message: values.message,
      };
      setIsSubmit(true);
      contact(data)
        .then((res) => {
          setIsSubmit(false);
          if (res.status === 200) {
            enqueueSnackbar(res.data, {
              variant: "success",
            });
          } else {
            enqueueSnackbar(res.message, {
              variant: "warning",
            });
          }
          formik.resetForm();
        })
        .catch((error) => {
          setIsSubmit(false);
          enqueueSnackbar(
            "Oops! Something went wrong. Please try again later.",
            {
              variant: "error",
            }
          );
        });
    },
  });

  return (
    <Box
      sx={{
        padding: { xs: "1.5rem 1rem", md: "3rem 2rem" },
        margin: { xs: "4rem auto 0", md: "5rem auto" },
        boxShadow: "0 0 15px 0px #00000020",
        borderRadius: "15px",
        overflow: "hidden",
        backgroundColor: "#fff",
        mx: "auto",
        maxWidth: "600px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography
          varient="h1"
          sx={{
            fontFamily: "'montserrat',cursive",
            color: "#671d63",
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            fontWeight: 500,
            textAlign: "center",
            lineHeight: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          Contact Us
        </Typography>
        <Box>
          <InputBox
            label="Name"
            fullWidth
            name="fullname"
            id="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
        </Box>
        <Box>
          <InputBox
            label="Contact No"
            fullWidth
            name="contact"
            id="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
          />
        </Box>
        <Box>
          <InputBox
            label="Email"
            fullWidth
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box>
          <InputBox
            label="Message"
            fullWidth
            multiline
            rows={6}
            name="message"
            id="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </Box>
        <Box>
          <PrimaryBtn
            fullWidth
            type="submit"
            disabled={isSubmit ? true : false}
            row
          >
            Send
            {isSubmit && (
              <CircularProgress
                sx={{ color: "#fff", maxWidth: "20px", maxHeight: "20px" }}
              />
            )}
          </PrimaryBtn>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
