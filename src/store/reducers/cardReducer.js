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
  chosenOrder : "0",
  cardMembers : [],
  cardLabels : [],
  searchMembers:"",
  cardCover:""
};

export default function cardReducer(cardState = initialState, action) {
  switch (action.type) {
    case "SUCCESS_GET_CARD_COVER": {
      return {
        ...cardState,
        cardCover: action.payload,
      };
    }case "SUCCESS_GET_CHOSEN_ORDER": {
      return {
        ...cardState,
        chosenOrder: action.payload.target.value,
        isLoading: false,
      };
    }
    case "STOP_LOADING":
      return {
        ...cardState,
        isLoading: false,
      };
      case "SUCCESS_GET_CARD_MEMBER":
      return {
        ...cardState,
        cardMembers : action.payload
        // isLoading: true,
      };
      case "SUCCESS_ADD_CARD_MEMBER":
      return {
        ...cardState,
        cardMembers : [...cardState.cardMembers, action.payload]
        // isLoading: true,
      };
      case "SUCCESS_DELETE_CARD_MEMBER":
      return {
        ...cardState,
        cardMembers : action.payload
        // isLoading: true,
      };
      case "SUCCESS_GET_CARD_LABEL":
      return {
        ...cardState,
        cardLabels : action.payload
        // isLoading: true,
      };
      case "SUCCESS_ADD_CARD_LABEL":
      return {
        ...cardState,
        cardLabels : [...cardState.cardLabels, action.payload]
        // isLoading: true,
      };
      case "SUCCESS_DELETE_CARD_LABEL":
      return {
        ...cardState,
        cardLabels : action.payload
        // isLoading: true,
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
      case "SUCCESS_MOVE_CARD":
      return {
        ...cardState,
        isLoading: true,
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

    case "SUCCESS_DELETE_CARD":
        return {
          ...cardState,
          isLoading: true,
        };
    default:
      return cardState;
  }
}
