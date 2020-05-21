export const addCard = (listId, text) => {
    return {
      type: "SUCCESS_ADD_CARD",
      payload: { listId, text },
    };
  };

  export const editCard = (id, listId, newText) => {
    return {
      type: "SUCCESS_EDIT_CARD",
      payload: { id, listId, newText }
    };
  };
  
  export const deleteCard = (id, listId) => {
    return {
      type: "SUCCESS_DELETE_CARD",
      payload: { id, listId }
    };
  };