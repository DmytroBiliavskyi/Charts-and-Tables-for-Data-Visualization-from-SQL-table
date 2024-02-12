import PropTypes from "prop-types";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Box,
} from "@mui/material";
import { useTable, useFilters, usePagination } from "react-table";
import { TablePagination } from "./third-party/ReactTable";

export default function ReactTable({
  columns,
  data,
  nothingString = "Nothing to Show",
  curPageSize = 10,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: curPageSize },
    },
    useFilters,
    usePagination
  );

  return (
    <Stack>
      <Table {...getTableProps()}>
        <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <TableCell
                  key={i}
                  {...column.getHeaderProps({ className: column.className })}
                  sx={{ color: "primary.main" }}
                >
                  <b>{column.render("Header")}</b>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <TableCell
                    key={index}
                    {...cell.getCellProps({ className: cell.column.className })}
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {page?.length === 0 && (
            <TableRow>
              <TableCell colSpan={20} sx={{ textAlign: "center" }}>
                {nothingString}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ pt: 3 }}>
        <TablePagination
          gotoPage={gotoPage}
          rows={rows}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </Box>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  nothingString: PropTypes.string,
  curPageSize: PropTypes.number,
};
