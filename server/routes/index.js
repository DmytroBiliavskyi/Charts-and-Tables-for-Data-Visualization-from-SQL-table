import filters from "./filter.js";
import iteminfos from "./iteminfo.js";

const mountRoutes = (app) => {
  app.use("/v1/filters", filters);
  app.use("/v1/iteminfo", iteminfos);
};

export default mountRoutes;
