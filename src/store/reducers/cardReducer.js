// let cardId = 0;

// const initialState = {
//   "card-0": {
//       id: `card-0`,
//     text: "Last Episode",
//     list: "list-0",
//   },
// };

const initialState = {
  cardList: [],
  isLoading: false,
};

export default function cardReducer(cardState = initialState, action) {
  switch (action.type) {
    case "STOP_LOADING":
      return {
        ...cardState,
        isLoading: false,
      };
    case "SUCCESS_GET_CARDS":
      return {
        ...cardState,
        cardList: action.payload,
        isLoading: false,
      };
    case "SUCCESS_CREATE_CARD":
      return {
        ...cardState,
        isLoading: true,
      };
    case "SUCCESS_REORDER_CARD":
      return {
        ...cardState,
        // isLoading: true,
      };
      case "SUCCESS_RENAME_CARD":
        return {
          ...cardState,
          isLoading: true,
        };
        case "CHANGE_INPUT_CARD":
          return {
            ...cardState,
            [action.payload.target.name]: action.payload.target.value,
          };
    case "SUCCESS_EDIT_CARD": {
      const { id, newText } = action.payload;
      const card = cardState[id];
      card.text = newText;
      return { ...cardState, [`card-${id}`]: card };
    }

    case "SUCCESS_DELETE_CARD": {
      const { id } = action.payload;
      const newState = cardState;
      delete newState[id];
      return newState;
    }
    default:
      return cardState;
  }
}
