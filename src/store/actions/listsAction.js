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

export const renameList = (listId, title) => {
  return async (dispatch) => {
    const bodyRequest = {
      id : listId,
      title: title,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .put(baseUrl + "/list", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_RENAME_LIST" });
      })
      .catch((error) => {
        console.log(error);
      });
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

export const reorderList = (code, boardId, order) => {
  return async (dispatch) => {
    const bodyRequest = {
      code: code,
      boardId: boardId,
      order: order,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .put(baseUrl + "/list/reorder", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_REORDER_LIST" });
      })
      .catch((error) => {
        console.log(error);
      });
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

export const chooseListId = (e) => {
  return {
    type: "CHANGE_CHOSEN_LIST_ID",
    payload: e,
  };
};

export const getChosenList = () => {
  return async (dispatch, getState) => {
    let id = getState().lists.chosenListId
    await axios
      .get(baseUrl + "/list", {
        params: { id: id },
      })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_CHOSEN_LIST", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const stopLoadingList = () => {
  return {
    type: "STOP_LOADING",
  };
};