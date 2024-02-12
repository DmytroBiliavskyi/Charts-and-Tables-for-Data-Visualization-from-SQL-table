import Router from "express-promise-router";
import db from "../db/index.js";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// only tool types
router.post("/v1", async (req, res) => {
  const start = Date.now();
  const toolTypeList = req.body.toolTypeList;
  let toolTypewhere = "";
  toolTypeList?.forEach((item) => {
    toolTypewhere +=
      item !== "Unrecognized"
        ? `calculated_tool_type = '${item}' or `
        : `calculated_tool_type IS NULL or `;
  });
  toolTypewhere = toolTypewhere.substring(0, toolTypewhere?.length - 4);
  const { rows } = await db.query(`
    SELECT 
      product_title,
      product_link,
      calculated_brand,
      calculated_tool_type,
      price,
      sold_date,
      ROUND(MIN(price) OVER (PARTITION BY sold_date), 2) AS min_price,
      ROUND(MAX(price) OVER (PARTITION BY sold_date), 2) AS max_price,
      ROUND(AVG(price) OVER (PARTITION BY sold_date), 2) AS avg_price
    FROM 
      item_info
    WHERE
      ${toolTypewhere};
    `);
  const duration = Date.now() - start;
  console.log("item info v1 query", { duration, rows: rows.length });
  res.send(rows);
});

// only brand
router.post("/v2", async (req, res) => {
  const start = Date.now();

  const brandList = req.body.brandList;
  let brandwhere = "";
  brandList?.forEach((item) => {
    brandwhere +=
      item !== "Unrecognized"
        ? `brand = '${item}' or calculated_brand = '${item}' or `
        : `brand IS NULL or calculated_brand IS NULL or `;
  });
  brandwhere = brandwhere.substring(0, brandwhere?.length - 4);

  const { rows } = await db.query(`
    SELECT 
      product_title,
      product_link,
      calculated_brand,
      calculated_tool_type,
      price,
      sold_date,
      ROUND(MIN(price) OVER (PARTITION BY sold_date), 2) AS min_price,
      ROUND(MAX(price) OVER (PARTITION BY sold_date), 2) AS max_price,
      ROUND(AVG(price) OVER (PARTITION BY sold_date), 2) AS avg_price
    FROM 
      item_info
    WHERE 
      ${brandwhere};
  `);
  const duration = Date.now() - start;
  console.log("item info v2 query", { duration, rows: rows.length });
  res.send(rows);
});

// brand and tool types
router.post("/v3", async (req, res) => {
  const start = Date.now();

  const brandList = req.body.brandList;
  let brandwhere = "";
  brandList?.forEach((item) => {
    brandwhere +=
      item !== "Unrecognized"
        ? `brand = '${item}' or calculated_brand = '${item}' or `
        : `brand IS NULL or calculated_brand IS NULL or `;
  });
  brandwhere = brandwhere.substring(0, brandwhere?.length - 4);

  const toolTypeList = req.body.toolTypeList;
  let toolTypewhere = "";
  toolTypeList?.forEach((item) => {
    toolTypewhere +=
      item !== "Unrecognized"
        ? `calculated_tool_type = '${item}' or `
        : `calculated_tool_type IS NULL or `;
  });
  toolTypewhere = toolTypewhere.substring(0, toolTypewhere?.length - 4);

  const { rows } = await db.query(`
    SELECT 
      product_title,
      product_link,
      calculated_brand,
      calculated_tool_type,
      price,
      sold_date,
      ROUND(MIN(price) OVER (PARTITION BY sold_date), 2) AS min_price,
      ROUND(MAX(price) OVER (PARTITION BY sold_date), 2) AS max_price,
      ROUND(AVG(price) OVER (PARTITION BY sold_date), 2) AS avg_price
    FROM 
      item_info
    WHERE 
      (${toolTypewhere}) and (${brandwhere});
  `);
  const duration = Date.now() - start;
  console.log("item info v3 query", { duration, rows: rows.length });
  res.send(rows);
});

// export our router to be mounted by the parent application
export default router;
