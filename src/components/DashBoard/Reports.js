import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReportCard from "../ReportCard";
import { host } from "../../constants";
import axios from "axios";
import ApexChart from "../DashboardGraph";

function Reports() {
  const [cardData, setCardData] = useState({});
  const [graphData, setGraphData] = useState(null);
  const {
    destinations,
    packages,
    tourOperators,
    tourists,
    employee,
  } = cardData;
  let getReportEndpoint = `${host}/report/getCardData`;
  useEffect(() => {
    getData();
    getGraphData();
  }, []);
  console.log(cardData);

  const getData = async () => {
    await axios.get(getReportEndpoint).then((res) => {
      setCardData(res.data);
    });
  };
  const getGraphData = async () => {
    const result = await axios.get(
      "http://localhost:9010/tourist/get-tourist-graph-data"
    );
    setGraphData(result.data);
  };
  return (
    <div>
      {destinations && (
        <Box>
          <Grid container sx={{ mt: 2 }} spacing={6}>
            <Grid item xs={12} md={2.4}>
              <ReportCard
                title={tourists.title}
                value={tourists.value}
                cardBackground={"#44804A"}
                titleBackground={"#60A66A"}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <ReportCard
                title={destinations.title}
                value={destinations.value}
                cardBackground={"#009CDF"}
                titleBackground={"#05648B"}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <ReportCard
                title={packages.title}
                value={packages.value}
                cardBackground={"#C81810"}
                titleBackground={"#B25E5E"}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <ReportCard
                title={employee.title}
                value={employee.value}
                cardBackground={"#F7C913"}
                titleBackground={"#9DA450"}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <ReportCard
                title={tourOperators.title}
                value={tourOperators.value}
                cardBackground={"#373737"}
                titleBackground={"#5B5B5B"}
              />
            </Grid>
            <Grid item xs={12}>
              {graphData && <ApexChart graphData={graphData} />}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default Reports;
