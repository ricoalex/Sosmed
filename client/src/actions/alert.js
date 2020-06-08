import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();
  // call set alert
  dispatch({
    type: SET_ALERT,
    payload: {msg, alertType, id}
  })

  
  // tambahkan set time
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
