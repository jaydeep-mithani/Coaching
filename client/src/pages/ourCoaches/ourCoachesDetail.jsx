import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getCoaches } from "../../services/session.service";
import PageBanner from "../../sections/PageBanner";
import SingleCoachDetail from "../../sections/SingleCoachDetail";
import CircularProgress from "@mui/material/CircularProgress";

const OurCoachesDetail = () => {
  const { id } = useParams();

  const [coachesData, setCoachesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoaches()
      .then((res) => {
        if (res?.status === 200) {
          const data = res?.data?.coaches?.filter((coach) => coach?._id === id);
          if (data && data?.length > 0) {
            setCoachesData(data[0]);
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);

  return (
    <>
      {coachesData?.firstName && (
        <PageBanner
          heading={`Meet Our Coach ${coachesData?.firstName}`}
          imgSrc="../coach-detail.jpeg"
        />
      )}
      <Box
        sx={{
          margin: "0 0",
          padding: {
            xs: "4rem 1rem 0",
            sm: "4rem 2rem 0",
            md: "4rem 3rem 0",
          },
          background: "linear-gradient(#DCD9F0,#ffffff)",
        }}
      >
        {!isLoading ? (
          <SingleCoachDetail
            id={coachesData?._id}
            name={coachesData?.firstName}
            imgSrc={`${coachesData?.image}`}
            descriptionArr={coachesData?.about}
          />
        ) : (
          <Box sx={{ paddingBottom: "3.5rem", textAlign: "center" }}>
            <CircularProgress
              sx={{ color: "#671d63", mx: "auto", textAlign: "center" }}
              color="secondary"
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default OurCoachesDetail;
