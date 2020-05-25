import axios from "axios";
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export const setActiveBoard = (boardId) => {
  return {
    type: "SET_ACTIVE_BOARD",
    payload: boardId,
  };
};

export const getBoard = () => {
  const tokenUser = localStorage.getItem("token");
  return async (dispatch) => {
    await axios({
      method: "GET",
      url: baseUrl + "/board/list",
      headers: { Authorization: `Bearer ${tokenUser}` },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_BOARD", payload: response.data });
        console.warn("getBoard", response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
};