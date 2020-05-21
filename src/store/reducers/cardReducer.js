let cardId = 0;

const initialState = {
  "card-0": {
      id: `card-0`,
    text: "Last Episode",
    list: "list-0",
  },
};

export default function listsReducer(cardState = initialState, action) {
  switch (action.type) {
    case "SUCCESS_ADD_CARD":
      const { text, listId } = action.payload;
      const newCard = {
        id: `card-${cardId}`,
        text: text,
        list: listId,
      };
      cardId += 1;
      return { ...cardState, [`card-${cardId}`]: newCard };

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
