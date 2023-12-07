import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

function ApexChart({ graphData }) {
  const [data, setData] = useState({
    series: [
      {
        data: graphData,
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              show: true,
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396",
              },
            },
          },
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2022").getTime(),
            borderColor: "#999",
            yAxisIndex: 0,
            label: {
              show: true,
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0",
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2022").getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },

    selection: "one_year",
  });

  function updateData(timeline) {
    setData((prevData) => ({ ...prevData, selection: timeline }));
    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2023").getTime(),
          new Date("01 Feb 2023").getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2023").getTime(),
          new Date("30 Jul 2023").getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2023").getTime(),
          new Date("30 Dec 2023").getTime()
        );
        break;
      case "ytd":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2023").getTime(),
          new Date("27 Dec 2023").getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2023").getTime(),
          new Date("30 Dec 2023").getTime()
        );
        break;
      default:
    }
  }

  return (
    <div id="chart">
      <div class="toolbar">
        <button
          id="one_month"
          onClick={() => updateData("one_month")}
          className={data.selection === "one_month" ? "active" : ""}
        >
          1M
        </button>
        &nbsp;
        <button
          id="six_months"
          onClick={() => updateData("six_months")}
          className={data.selection === "six_months" ? "active" : ""}
        >
          6M
        </button>
        &nbsp;
        <button
          id="one_year"
          onClick={() => updateData("one_year")}
          className={data.selection === "one_year" ? "active" : ""}
        >
          1Y
        </button>
        &nbsp;
        <button
          id="ytd"
          onClick={() => updateData("ytd")}
          className={data.selection === "ytd" ? "active" : ""}
        >
          YTD
        </button>
        &nbsp;
        <button
          id="all"
          onClick={() => updateData("all")}
          className={data.selection === "all" ? "active" : ""}
        >
          ALL
        </button>
      </div>

      <div id="chart-timeline">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

export default ApexChart;
