import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SuccessStories from "./SuccessStoriesCard";
import { getCoaches } from "../services/session.service";
import CircularProgress from "@mui/material/CircularProgress";

const OurCoachesCard = () => {
  const [coachesData, setCoachesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const coachesData = await getCoaches();
      setCoachesData(
        coachesData?.data?.coaches
          ?.reverse()
          ?.filter((coach) => coach?.order !== 1)
      );
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <Box
      sx={{
        paddingBottom: "80px",
        position: "relative",
        display: "grid",
        gap: "15px",
      }}
    >
      {!isLoading ? (
        coachesData?.length > 0 &&
        coachesData
          ?.sort((a, b) => (a?.order > b?.order ? 1 : -1))
          ?.map((data) => (
            <SuccessStories
              key={data?._id}
              title={`${data?.firstName} ${data?.lastName}`}
              imgSrc={data?.image}
              reverse={data?.reverse}
              descriptionArr={data?.about}
              id={data?._id}
              isDetailPage={false}
              wholeContent={false}
              isOurCoachCard={true}
            />
          ))
      ) : (
        <Box sx={{ paddingBottom: "3.5rem", textAlign: "center" }}>
          <CircularProgress
            sx={{ color: "#671d63", mx: "auto", textAlign: "center" }}
            color="secondary"
          />
        </Box>
      )}
    </Box>
  );
};

export default OurCoachesCard;
