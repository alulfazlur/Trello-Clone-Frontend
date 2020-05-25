import axios from "axios";
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export const getList = (boardId) => {
  return async (dispatch) => {
    await axios
      .get(baseUrl + "/list/list", 
      {
        params: { boardId: boardId },
      })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_LIST", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changeInputList = (e) => {
  return {
    type: "CHANGE_INPUT_LIST",
    payload: e,
  };
};

export const createList = (boardId, title) => {
  return async (dispatch) => {
    const bodyRequest = {
      boardId: boardId,
      title: title,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .post(baseUrl + "/list", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_CREATE_LIST" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addList = (title) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SUCCESS_ADD_LIST",
      payload: title
    });
  };
};

export const addCard = (listId, text) => {
  return {
    type: "SUCCESS_ADD_CARD",
    payload: { listId, text },
  };
};

export const editTitle = (listId, newTitle) => {
  return {
    type: "SUCCESS_EDIT_LIST",
    payload: {
      listId,
      newTitle
    }
  };
};

export const deleteList = (listId) => {
  return {
    type: "SUCCESS_DELETE_LIST",
    payload: {
      listId
    }
  };
};

export const sortOnDrag = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: "DRAGGED",
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    },
  };
};
