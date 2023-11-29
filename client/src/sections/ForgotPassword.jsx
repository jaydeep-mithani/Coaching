import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { MainModal } from "../components/MainModal";
import { useSnackbar } from "notistack";
import { validationForgotSchema } from "../utils/validation";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import { requestReset } from "../services/auth.service";

const ForgotPassword = ({
  isOpen,
  onClose,
  onResetClose,
  blur,
  closeAllModal,
}) => {
  const [isSending, setIsSending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    validationSchema: validationForgotSchema,
    onSubmit: (values) => {
      setIsSending(true);
      requestReset({ email: values.email })
        .then((res) => {
          if (res?.status === 200) {
            setIsSending(false);
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
            formik.resetForm();
            onResetClose();
            closeAllModal();
          } else if (res?.response?.data?.error) {
            setIsSending(false);
            enqueueSnackbar(res?.response?.data?.error, {
              variant: "error",
            });
          } else if (
            res?.response?.status === 400 ||
            res?.response?.status === 401
          ) {
            setIsSending(false);
            onResetClose();
            enqueueSnackbar(res?.response?.data?.message, {
              variant: "error",
            });
          } else if (res?.response?.status === 403) {
            setIsSending(false);
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
                {res?.response?.data?.message}
                <br />
                <span>NOTE: {res?.response?.data?.note}</span>
              </Box>,
              { variant: "warning", autoHideDuration: 7000 }
            );
            formik.resetForm();
            onResetClose();
            closeAllModal();
          }
        })
        .catch((error) => {
          enqueueSnackbar(error?.response?.data?.error, {
            variant: "error",
          });
        });
    },
  });

  return (
    <MainModal blur={blur} open={isOpen} handleClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#671d63",
            fontSize: "1.5rem",
            fontWeight: 900,
            marginBottom: "1rem",
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          component={"p"}
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            textAlign: "center",
            color: "#000",
            marginBottom: "10px",
          }}
        >
          Please enter registered email address you'd like to reset password
        </Typography>
        <InputBox
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "1px solid #671d61",
            background: "#671d61",
            color: "#fff",
            ":hover": {
              border: "1px solid #671d61",
              color: "#671d61",
            },
            ":disabled": {
              color: "#fff",
            },
          }}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
          {isSending && (
            <CircularProgress size={"10px"} sx={{ color: "#fff" }} />
          )}
        </Button>
      </form>
    </MainModal>
  );
};

export default ForgotPassword;
