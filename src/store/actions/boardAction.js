import axios from "axios";
// const baseUrl = process.env.REACT_APP_PUBLIC_URL;
const baseUrl = "https://trello-be.fazlurtech.my.id";

export const setActiveBoard = (boardId) => {
  return {
    type: "SET_ACTIVE_BOARD",
    payload: boardId,
  };
};

export const getActiveBoard = (activerBoardId) => {
  return async (dispatch) => {
    await axios
      .get(baseUrl + "/board", {
        params: { id: activerBoardId },
      })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_ACTIVE_BOARD", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getBoardList = () => {
  const tokenUser = localStorage.getItem("token");
  return async (dispatch) => {
    await axios({
      method: "GET",
      url: baseUrl + "/board/list",
      headers: { Authorization: `Bearer ${tokenUser}` },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_BOARD", payload: response.data });
        // console.warn("getBoard", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addBoard = () => {
  const tokenUser = localStorage.getItem("token");
  return async (dispatch, getState) => {
    await axios({
      method: "POST",
      url: baseUrl + "/board",
      headers: { Authorization: `Bearer ${tokenUser}` },
      data :{
        title : getState().board.newTitle
      }
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_ADD_BOARD", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changeInputBoard = (e) => {
  return {
    type: "CHANGE_INPUT_BOARD",
    payload: e,
  };
};

export const getChosenBoard = () => {
  return async (dispatch, getState) => {
    let id = getState().board.chosenBoardId
      ? getState().board.chosenBoardId
      : getState().board.activeBoardId;
    await axios
      .get(baseUrl + "/board", {
        params: { id: id },
      })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_CHOSEN_BOARD", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};



export const stopLoadingBoard = () => {
  return {
    type: "STOP_LOADING",
  };
};