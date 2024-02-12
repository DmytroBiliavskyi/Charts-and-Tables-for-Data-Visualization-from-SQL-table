import Router from "express-promise-router";
import db from "../db/index.js";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

router.get("/brand", async (_, res) => {
  const start = Date.now();
  const { rows } = await db.query(`
    SELECT COALESCE(unique_brands, 'Unrecognized') AS brand_option
    FROM (
      SELECT DISTINCT brand AS unique_brands
      FROM item_info
      UNION
      SELECT DISTINCT calculated_brand AS unique_brands
      FROM item_info
    ) AS all_unique_brands;
  `);
  const duration = Date.now() - start;
  console.log("filter brand query", { duration, rows: rows.length });
  res.send(rows);
});

router.get("/tool_type", async (_, res) => {
  const start = Date.now();
  const { rows } = await db.query(`
    SELECT DISTINCT calculated_tool_type from item_info
  `);
  const duration = Date.now() - start;
  console.log("filter tool type query", { duration, rows: rows.length });
  res.send(rows);
});

// export our router to be mounted by the parent application
export default router;
