import { useState } from "react";
import {
  Typography,
  Stack,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import Loader from "./components/Loader";
import ItemInfoTable from "./sections/Table";
import ItemInfoChart from "./sections/Chart";
import useProduct from "./hooks/Product";

const App = () => {
  const {
    brandList,
    toolTypeList,
    getItemInfoV1,
    getItemInfoV2,
    getItemInfoV3,
  } = useProduct();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedToolTypes, setSelectedToolTypes] = useState([]);

  const [loading, setLoading] = useState(null);

  const [itemList, setItemList] = useState([]);

  const handleGetItemInfo = async () => {
    if (!selectedBrand && selectedToolTypes?.length === 0) return;
    setLoading(true);
    if (!selectedBrand) {
      const result = await getItemInfoV1(selectedToolTypes);
      setItemList(result);
      setLoading(false);
      return;
    }
    if (selectedToolTypes?.length === 0) {
      const result = await getItemInfoV2(selectedBrand);
      setItemList(result);
      setLoading(false);
      return;
    }
    const result = await getItemInfoV3(selectedBrand, selectedToolTypes);
    setItemList(result);
    setLoading(false);
    return;
  };

  return (
    <>
      {loading && <Loader />}
      <Stack spacing={3.75} sx={{ px: 3, py: 5 }}>
        <Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} xl={6}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography variant="h4">
                  Chart & Tables for Data Visualization
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={!selectedBrand && selectedToolTypes?.length === 0}
                  onClick={handleGetItemInfo}
                >
                  Apply
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} md={8} xl={6}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="flex-end" spacing={2}>
                  <Stack spacing={0.75} sx={{ width: `calc(100% - 104px)` }}>
                    <Typography>Brand Filter</Typography>
                    <Select
                      size="small"
                      fullWidth
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          style: { maxHeight: 300, maxWidth: 300 },
                        },
                        MenuListProps: {
                          disablePadding: true,
                        },
                      }}
                    >
                      {brandList
                        ?.sort((a, b) => {
                          if (a?.brand_option > b?.brand_option) return 1;
                          if (a?.brand_option < b?.brand_option) return -1;
                          return 0;
                        })
                        ?.map((brand, idx) => {
                          return (
                            <MenuItem
                              key={`brand_${idx}`}
                              value={brand?.brand_option || "Unrecognized"}
                            >
                              {brand?.brand_option || "Unrecognized"}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </Stack>
                  <Button
                    variant="outlined"
                    size="large"
                    disableElevation
                    onClick={() => {
                      setSelectedBrand("");
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="flex-end" spacing={2}>
                  <Stack spacing={0.75} sx={{ width: `calc(100% - 112px)` }}>
                    <Typography>Tool Type Filter</Typography>
                    <Select
                      size="small"
                      multiple
                      value={selectedToolTypes}
                      onChange={(e) => {
                        const {
                          target: { value },
                        } = e;
                        setSelectedToolTypes(
                          typeof value === "string" ? value.split(",") : value
                        );
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: { maxHeight: 300, maxWidth: 300 },
                        },
                        MenuListProps: {
                          disablePadding: true,
                        },
                      }}
                      sx={{ width: "-webkit-fill-available" }}
                    >
                      {toolTypeList
                        ?.sort((a, b) => {
                          if (a?.calculated_tool_type > b?.calculated_tool_type)
                            return 1;
                          if (a?.calculated_tool_type < b?.calculated_tool_type)
                            return -1;
                          return 0;
                        })
                        ?.map((tool_type, idx) => {
                          return (
                            <MenuItem
                              key={`tool_type_${idx}`}
                              value={
                                tool_type?.calculated_tool_type ||
                                "Unrecognized"
                              }
                            >
                              {tool_type?.calculated_tool_type ||
                                "Unrecognized"}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </Stack>
                  <Button
                    variant="outlined"
                    size="large"
                    disableElevation
                    onClick={() => {
                      setSelectedToolTypes([]);
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <ItemInfoChart itemList={itemList} />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <ItemInfoTable itemList={itemList} />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default App;
