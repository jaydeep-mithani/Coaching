import React, { useState } from "react";
import { useFormik } from "formik";
import { validationResetPassword } from "../../utils/validation";
import { useSnackbar } from "notistack";
import { Box, CircularProgress, Typography } from "@mui/material";
import { InputBox } from "../../components/InputBox";
import { PrimaryBtn } from "../../components/PrimaryBtn";
import { resetPassword } from "../../services/auth.service";
import { useParams, useNavigate } from "react-router-dom";
import * as CryptoJS from "crypto-js";

const ResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLogIn, setIsLogin] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassWord: "",
    },
    enableReinitialize: true,
    validationSchema: validationResetPassword,
    onSubmit: (values) => {
      setIsLogin(true);
      if (values.password === values.confirmPassWord) {
        const passwordEncrypt = CryptoJS.AES.encrypt(
          values.password,
          import.meta.env.VITE_SECRET
        ).toString();
        const data = {
          token: resetToken,
          password: passwordEncrypt,
        };
        resetPassword(data)
          .then((res) => {
            if (res?.status === 200) {
              setIsLogin(false);
              enqueueSnackbar(res?.data?.message, { variant: "success" });
              formik.resetForm();
              navigate("/");
            } else if (res?.response?.data?.error) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.error, {
                variant: "error",
              });
            } else if (
              res.response.status === 401 ||
              res.response.status === 400
            ) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.message, {
                variant: "error",
              });
            }
          })
          .catch((error) => {
            setIsLogin(false);
            enqueueSnackbar(error?.response?.data?.error, {
              variant: "error",
            });
          });
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "75vh",
        alignItems: "cenetr",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "25%",
        mx: "auto",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography
          sx={{
            fontSize: "25px",
            textAlign: "center",
            marginBottom: "20px",
            color: "#873785",
          }}
        >
          Reset Password
        </Typography>
        <InputBox
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <InputBox
          fullWidth
          id="confirmPassWord"
          name="confirmPassWord"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassWord}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassWord &&
            Boolean(formik.errors.confirmPassWord)
          }
          helperText={
            formik.touched.confirmPassWord && formik.errors.confirmPassWord
          }
        />
        <PrimaryBtn fullWidth type="submit" row>
          Reset
          {isLogIn && (
            <CircularProgress
              sx={{ color: "#fff", maxWidth: "20px", maxHeight: "20px" }}
            />
          )}
        </PrimaryBtn>
      </form>
    </Box>
  );
};

export default ResetPassword;
