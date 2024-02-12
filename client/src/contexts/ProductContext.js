import PropTypes from "prop-types";
import axios from "../utils/axios";
import { createContext, useCallback, useEffect, useReducer } from "react";

// reducer - state management
import { BRANDS, TOOL_TYPES, INITIALIZED } from "../store/action";
import productReducer from "../store/product";

// project import
import Loader from "../components/Loader";
import { initialState } from "../store/product";

// ==============================|| Product CONTEXT & PROVIDER ||============================== //

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const setBrandList = (brandList) => {
    dispatch({ type: BRANDS, payload: { brandList } });
  };

  const setToolTypeList = (toolTypeList) => {
    dispatch({ type: TOOL_TYPES, payload: { toolTypeList } });
  };

  const getBrandList = useCallback(async () => {
    try {
      const res = await axios.get("/filters/brand");
      setBrandList(res?.data);
    } catch (err) {
      console.error(err);
      setBrandList([]);
    }
  }, []);

  const getToolTypeList = useCallback(async () => {
    try {
      const res = await axios.get("/filters/tool_type");
      setToolTypeList(res?.data);
    } catch (err) {
      console.error(err);
      setToolTypeList([]);
    }
  }, []);

  // only tool types
  const getItemInfoV1 = useCallback(async (toolTypeList) => {
    try {
      const res = await axios.post("/iteminfo/v1", { toolTypeList });
      return res?.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  // only brand
  const getItemInfoV2 = useCallback(async (brand) => {
    try {
      const res = await axios.post("/iteminfo/v2", { brand });
      return res?.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  // brand and tool types
  const getItemInfoV3 = useCallback(async (brand, toolTypeList) => {
    try {
      const res = await axios.post("/iteminfo/v3", { brand, toolTypeList });
      return res?.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  useEffect(() => {
    Promise.all([getBrandList(), getToolTypeList()]).then(() => {
      dispatch({ type: INITIALIZED });
    });
  }, [getBrandList, getToolTypeList]);

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <ProductContext.Provider
      value={{ ...state, getItemInfoV1, getItemInfoV2, getItemInfoV3 }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node,
};

export default ProductContext;
