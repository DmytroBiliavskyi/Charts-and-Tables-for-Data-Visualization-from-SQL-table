import { useContext } from "react";

// product provider
import ProductContext from "../contexts/ProductContext";

// ==============================|| PRODUCT HOOKS ||============================== //

const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("context must be use inside provider");

  return context;
};

export default useProduct;
