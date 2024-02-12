import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

import { formatDate } from "../utils/function";

const calculateMetrics = (data) => {
  const result = [];

  // Group items by sold date
  const groups = data.reduce((acc, obj) => {
    acc[obj.sold_date] = acc[obj.sold_date] || [];
    acc[obj.sold_date].push(obj);
    return acc;
  }, {});

  // Calculate metrics for each group
  for (const date in groups) {
    const items = groups[date];
    const itemCount = items.length;
    const minPrice = Math.min(
      ...items.map((item) => parseFloat(item.min_price))
    );
    const maxPrice = Math.max(
      ...items.map((item) => parseFloat(item.max_price))
    );
    const avgPrice =
      items.reduce((total, item) => total + parseFloat(item.avg_price), 0) /
      itemCount;

    // Pushing metrics to the result array
    result.push({
      sold_date: date,
      min_price: minPrice,
      max_price: maxPrice,
      avg_price: Math.round(avgPrice * 100) / 100,
      item_count: itemCount,
    });
  }

  return result;
};

// Calculate metrics

const ItemInfoChart = ({ itemList }) => {
  const metrics = calculateMetrics(itemList);

  const series = useMemo(
    () => [
      {
        name: "Min Price",
        type: "line",
        data: metrics?.map((item) => {
          return { y: item?.min_price, x: formatDate(item?.sold_date) };
        }),
      },
      {
        name: "Max Price",
        type: "line",
        data: metrics?.map((item) => {
          return { y: item?.max_price, x: formatDate(item?.sold_date) };
        }),
      },
      {
        name: "Avg Price",
        type: "line",
        data: metrics?.map((item) => {
          return { y: item?.avg_price, x: formatDate(item?.sold_date) };
        }),
      },
      {
        name: "Number of Items",
        type: "column",
        data: metrics?.map((item) => {
          return {
            y: parseInt(item?.item_count),
            x: formatDate(item?.sold_date),
          };
        }),
      },
    ],
    [metrics]
  );

  const areaChartOptions = {
    chart: {
      toolbar: { show: false },
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    },
    stroke: {
      curve: "straight",
      width: [3, 3, 3, 0],
    },
    legend: { horizontalAlign: "left", position: "top", fontSize: "16px" },
    toolbar: { show: false },
    yaxis: {
      show: true,
      axisBorder: { show: false },
    },
    xaxis: { tooltip: { enabled: false } },
    colors: ["#F79E1B", "#FF0000", "#00FF00", "#00AAFF"],
    fill: {
      type: "solid",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
    grid: {
      row: {
        colors: ["transparent", "#F3F3F3"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [3],
      formatter: function (val) {
        return val;
      },
      offsetY: -10,
      style: {
        fontSize: "14px",
        colors: ["rgba(0,0,0,0)"],
        width: "40%",
      },
      background: {
        enabled: true,
        foreColor: "rgba(0,0,0,1)",
        borderWidth: 0,
      },
    },
  };

  const getWidth = useCallback(() => {
    return metrics?.length * 80 > window.innerWidth
      ? metrics?.length * 80
      : `99.9%`;
  }, [metrics]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Item Info Chart</Typography>
      <Stack sx={{ width: "100%", overflowX: "auto" }}>
        <ReactApexChart
          options={areaChartOptions}
          series={series}
          type="area"
          width={getWidth()}
          height={500}
        />
      </Stack>
    </Stack>
  );
};

ItemInfoChart.propTypes = {
  itemList: PropTypes.array,
};
export default ItemInfoChart;
