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
