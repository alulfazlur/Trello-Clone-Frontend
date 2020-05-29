const initialState = {
  boardList: [],
  activeBoard: {
    lists: [],
    activeBoardId: "",
  },
  chosenBoardId:"",
  chosenBoard:{
  },
  isLoading: false,
};

const boardReducer = (boardState = initialState, action) => {
  switch (action.type) {
    case "STOP_LOADING":
      return {
        ...boardState,
        isLoading: false,
      };
    case "SET_ACTIVE_BOARD": {
      return {
        ...boardState,
        activeBoardId: action.payload,
        isLoading: true,
      };
    }
    case "SUCCESS_GET_BOARD": {
      return {
        ...boardState,
        boardList: action.payload,
        isLoading: false,
      };
    }
    case "SUCCESS_GET_ACTIVE_BOARD": {
      return {
        ...boardState,
        activeBoard: action.payload,
        isLoading: false,
      };
    }
    case "SUCCESS_GET_CHOSEN_BOARD": {
      return {
        ...boardState,
        chosenBoard: action.payload,
        isLoading: false,
      };
    }
    case "CHANGE_CHOSEN_BOARD_ID":
      return {
        ...boardState,
        [action.payload.target.name] : action.payload.target.value,
        isLoading: true,
      };
    default:
      return boardState;
  }
};

export default boardReducer;
