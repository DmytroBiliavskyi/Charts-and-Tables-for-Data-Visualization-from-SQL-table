// action - state management
import { BRANDS, TOOL_TYPES, INITIALIZED } from "./action";

// initial state
export const initialState = {
  brandList: [],
  toolTypeList: [],
  isInitialized: false,
};

// ==============================|| PRODUCT REDUCER ||============================== //

const product = (state = initialState, action) => {
  switch (action.type) {
    case BRANDS: {
      const { brandList } = action.payload;
      return {
        ...state,
        brandList,
      };
    }
    case TOOL_TYPES: {
      const { toolTypeList } = action.payload;
      return {
        ...state,
        toolTypeList,
      };
    }
    case INITIALIZED: {
      return {
        ...state,
        isInitialized: true,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default product;
