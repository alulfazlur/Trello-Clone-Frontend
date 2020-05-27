const initialState = {
  boardList:[],
  activeBoard:{}
};

const boardReducer = (boardState = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_BOARD": {
      return {
        ...boardState,
        activerBoardId: action.payload,
      };
    }
    case "SUCCESS_GET_BOARD": {
      return {
        ...boardState,
        boardList: action.payload,
      };
    }
    case "SUCCESS_GET_ACTIVE_BOARD": {
      return {
        ...boardState,
        activeBoard: action.payload,
      };
    }
    default:
      return boardState;
  }
};

export default boardReducer;
