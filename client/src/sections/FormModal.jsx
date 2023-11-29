import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { MainModal } from "../components/MainModal";
import { PrimaryBtn } from "../components/PrimaryBtn";
import { InputBox } from "../components/InputBox";
import { login, register } from "../services/auth.service";
import { setToken, setUserDetails } from "../utils/auth";
import {
  validationLoginSchema,
  validationRegisterSchema,
} from "../utils/validation";
import * as CryptoJS from "crypto-js";
import ForgotPassword from "./ForgotPassword";
import EventEmitter from "reactjs-eventemitter";
const FormModal = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [logingForm, setLogingForm] = useState(true);
  const [isLogIn, setIsLogin] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: !logingForm
      ? validationRegisterSchema
      : validationLoginSchema,
    onSubmit: (values) => {
      setIsLogin(true);
      if (logingForm) {
        const passwordEncrypt = CryptoJS.AES.encrypt(
          values.password,
          import.meta.env.VITE_SECRET
        ).toString();
        const data = {
          email: values.email,
          password: passwordEncrypt,
        };
        login(data)
          .then((res) => {
            if (res?.status === 200) {
              setIsLogin(false);
              enqueueSnackbar(res?.data?.message, { variant: "success" });
              setToken(res?.data?.token);
              setUserDetails(res?.data?.user);
              formik.resetForm();
              handleClose();
              EventEmitter.dispatch("loginSuccess", true);
            } else if (
              res?.response?.data?.errors &&
              res?.response?.data?.errors.length > 0
            ) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.errors[0].msg, {
                variant: "error",
              });
            } else if (res.response.status === 401) {
              setIsLogin(false);
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
                {
                  variant: "error",
                  autoHideDuration: 7000,
                }
              );
            } else if (res.response.status === 500) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.error, {
                variant: "error",
              });
            }
          })
          .catch((error) => {
            setIsLogin(false);
            enqueueSnackbar(error?.response?.data?.errors[0]?.msg, {
              variant: "error",
            });
          });
      } else {
        const passwordEncrypt = CryptoJS.AES.encrypt(
          values.password,
          import.meta.env.VITE_SECRET
        ).toString();
        const data = {
          name: values.name,
          email: values.email,
          password: passwordEncrypt,
        };
        register(data)
          .then((res) => {
            if (res?.status === 201) {
              setIsLogin(false);
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
              handleClose();
            } else if (res?.response?.data?.error) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.error, {
                variant: "error",
              });
            } else if (res.response.status === 401) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.message, {
                variant: "error",
              });
            } else if (res.response.status === 403) {
              setIsLogin(false);
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
                {
                  variant: "error",
                  autoHideDuration: 7000,
                }
              );
            } else if (res.response.status === 500) {
              setIsLogin(false);
              enqueueSnackbar(res?.response?.data?.error, {
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
    <MainModal open={open} handleClose={handleClose}>
      <Typography
        component={"h4"}
        sx={{
          fontSize: "26px",
          fontWeight: "600",
          textAlign: "center",
          color: "#671d63",
          marginBottom: "10px",
        }}
      >
        {logingForm ? "Log In" : "Register"}
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
        Enter Your Details Below To Access The Guide
      </Typography>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          {!logingForm && (
            <InputBox
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          )}
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
          <PrimaryBtn
            fullWidth
            type="submit"
            disabled={isLogIn ? true : false}
            row
          >
            {logingForm ? <span>Log In</span> : <span>Register</span>}
            {isLogIn && (
              <CircularProgress
                sx={{ color: "#fff", maxWidth: "20px", maxHeight: "20px" }}
              />
            )}
          </PrimaryBtn>
          {logingForm && (
            <>
              <ForgotPassword
                closeAllModal={() => handleClose(false)}
                isOpen={openReset}
                onClose={() => setOpenReset(false)}
                onResetClose={() => {
                  setOpenReset(false);
                }}
                blur
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  paddingTop: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem", fontWeight: 100 }}
                >
                  Forgot password?
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "#671d63",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                    fontWeight: 100,
                    padding: 0,
                  }}
                  onClick={() => {
                    setOpenReset(true);
                  }}
                >
                  Recover it here.
                </Button>
              </Box>
            </>
          )}
          <Typography sx={{ textAlign: "center", mt: "20px" }}>
            {logingForm ? "Don't have account? " : "Already Registered? "}
            <span
              style={{ cursor: "pointer", color: "#671d63" }}
              onClick={() => {
                formik.resetForm();
                setLogingForm(!logingForm);
              }}
            >
              {logingForm ? "Register." : "Log In."}
            </span>
          </Typography>
        </form>
      </Box>
    </MainModal>
  );
};

export default FormModal;
