import axios from "axios";
import { BACK_URL } from "../../config/key";
import { CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FAIL } from "./category.type";

//get category
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });

    const { data } = await axios.get(`${BACK_URL}/blogcategory/list`);

    dispatch({ type: CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_FAIL, payload: error?.response?.data?.msg || error?.msg });
  }
};

//add categries
