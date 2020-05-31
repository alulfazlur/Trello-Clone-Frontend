import axios from "axios";
const baseUrl = process.env.REACT_APP_PUBLIC_URL;

export const getCards = (listId) => {
  return async (dispatch) => {
    await axios
      .get(baseUrl + "/card/list", {
        params: { listId: listId },
      })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_CARDS", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createCard = (listId, text) => {
  return async (dispatch) => {
    const bodyRequest = {
      listId: listId,
      text: text,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .post(baseUrl + "/card", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_CREATE_CARD" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCard = (id) => {
  return async (dispatch) => {
    const bodyRequest = {
      id: id
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios({
      method: "DELETE",
      url: baseUrl + "/card",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: id,
      },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_DELETE_CARD", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const reorderCard = (code, listCode, order) => {
  return async (dispatch) => {
    const bodyRequest = {
      code: code,
      listCode: listCode,
      order: order,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .put(baseUrl + "/card/reorder", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_REORDER_CARD" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const chooseOrder = (e) => {
  return {
    type: "SUCCESS_GET_CHOSEN_ORDER",
    payload: e,
  };
};

export const moveCard = (id) => {
  return async (dispatch, getState) => {
    const bodyRequest = {
      id: id,
      listId: getState().lists.chosenListId,
      order: getState().cards.chosenOrder,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .put(baseUrl + "/card", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_MOVE_CARD" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const renameCard = (id, listId, text) => {
  return async (dispatch) => {
    const bodyRequest = {
      id: id,
      listId: listId,
      text: text,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .put(baseUrl + "/card", bodyRequest, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_RENAME_CARD" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCardMember = (cardId) => {
  return async (dispatch) => {
    const bodyRequest = {
      cardId: cardId,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    await axios({
      method: "GET",
      url: baseUrl + "/card/member/list",
      params: {
        cardId: cardId
      },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_CARD_MEMBER", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCardMember = (cardId, username) => {
  return async (dispatch) => {
    const bodyRequest = {
      cardId: cardId,
      username: username,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .post(baseUrl + "/card/member", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "SUCCESS_ADD_CARD_MEMBER", payload: response.data });
      })
      .catch(async(error) => {
        console.log(error);
      });
  };
};

export const deleteCardMember = (cardId, username) => {
  return async (dispatch) => {
    const bodyRequest = {
      cardId: cardId,
      username: username,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req delete card member", myJSON);
    const token = localStorage.getItem("token");
    await axios({
      method: "DELETE",
      url: baseUrl + "/card/member",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        cardId: cardId,
      username: username,
      },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_DELETE_CARD_MEMBER", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCardLabel = (cardId) => {
  return async (dispatch) => {
    const bodyRequest = {
      cardId: cardId,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    await axios({
      method: "GET",
      url: baseUrl + "/card/label/list",
      params: {
        cardId: cardId
      },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_CARD_LABEL", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCardLabel = (cardId, label) => {
  return async (dispatch) => {
    const bodyRequest = {
      cardId: cardId,
      label: label,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .post(baseUrl + "/card/label", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "SUCCESS_ADD_CARD_LABEL", payload: response.data });
      })
      .catch(async(error) => {
        console.log(error);
      });
  };
};

export const deleteCardLabel = (cardId, label) => {
  return async (dispatch) => {
    const bodyRequest = {
      cardId: cardId,
      label: label,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req delete card member", myJSON);
    const token = localStorage.getItem("token");
    await axios({
      method: "DELETE",
      url: baseUrl + "/card/label",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        cardId: cardId,
      label: label,
      },
    })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_DELETE_CARD_LABEL", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const stopLoading = () => {
  return {
    type: "STOP_LOADING",
  };
};

export const changeInputCard = (e) => {
  return {
    type: "CHANGE_INPUT_CARD",
    payload: e,
  };
};


