import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import ReactTable from "../components/ReactTable";
import { OutlinedInput, Stack, Typography } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { formatDate, normalizeString } from "../utils/function";

const ItemInfoTable = ({ itemList }) => {
  const column = useMemo(
    () => [
      {
        Header: "Product Title",
        accessor: "product_title",
        Cell: ({ row }) => {
          // eslint-disable-next-line
          const item = row?.original;
          return (
            <Typography
              onClick={() => window.open(item?.product_link, "_blank")}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {item?.product_title}
            </Typography>
          );
        },
      },
      {
        Header: "Product Brand",
        accessor: "calculated_brand",
        Cell: ({ row }) => {
          // eslint-disable-next-line
          const item = row?.original;
          return item?.brand || item?.calculated_brand || "Unrecognized";
        },
      },
      {
        Header: "Tool Type",
        accessor: "calculated_tool_type",
        Cell: ({ value }) => value || "Unrecognized",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Daily Average",
        accessor: "avg_price",
      },
      {
        Header: "Max",
        accessor: "max_price",
      },
      {
        Header: "Min",
        accessor: "min_price",
      },
      {
        Header: "Listing Date",
        accessor: "sold_date",
        Cell: ({ value }) => formatDate(value),
      },
    ],
    []
  );
  const [pattern, setPattern] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(
      itemList?.filter((item) => {
        const searchPattern = normalizeString(pattern);
        const product_title = normalizeString(item?.product_title);
        const calculated_brand = normalizeString(
          item?.brand || item?.calculated_brand || "Unrecognized"
        );
        const calculated_tool_type = normalizeString(
          item?.calculated_tool_type || "Unrecognized"
        );
        const price = normalizeString(item?.price);
        const avg_price = normalizeString(item?.avg_price);
        const max_price = normalizeString(item?.max_price);
        const min_price = normalizeString(item?.min_price);
        const sold_date = normalizeString(formatDate(item?.sold_date));

        return (
          product_title?.includes(searchPattern) ||
          calculated_brand?.includes(searchPattern) ||
          calculated_tool_type?.includes(searchPattern) ||
          price?.includes(searchPattern) ||
          avg_price?.includes(searchPattern) ||
          max_price?.includes(searchPattern) ||
          min_price?.includes(searchPattern) ||
          sold_date?.includes(searchPattern)
        );
      })
    );
  }, [itemList, pattern]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">
          Item Info Table ({pattern ? "Search Result:" : "Result:"}{" "}
          {filteredList?.length})
        </Typography>
        <OutlinedInput
          size="small"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          startAdornment={<SearchOutlined style={{ color: "#aaa" }} />}
          placeholder="Search..."
          sx={{
            "& .MuiOutlinedInput-input": { mx: 1 },
            width: { xs: "100%", md: 480 },
          }}
        />
      </Stack>
      <ReactTable columns={column} data={filteredList} />
    </Stack>
  );
};

ItemInfoTable.propTypes = {
  itemList: PropTypes.array,
};
export default ItemInfoTable;
