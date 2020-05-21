const initialState = [
  {
    title: "First List",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "First card",
      },
      {
        id: `card-${1}`,
        text: "Second card",
      },
    ],
  },
  {
    title: "Second List",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "First card",
      },
      {
        id: `card-${3}`,
        text: "Second card",
      },
      {
        id: `card-${4}`,
        text: "Third card",
      },
    ],
  },
];
let listId = 2;
let cardId = 6;

export default function listsReducer(listsState = initialState, action) {
  switch (action.type) {
    case "SUCCESS_ADD_LIST":
      const newList = {
        id: `list-${listId}`,
        title: action.payload,
        cards: [],
      };
      listId += 1;
      return [...listsState, newList];
    case "SUCCESS_ADD_CARD":
      const newCard = {
        id: `card-${cardId}`,
        text: action.payload.text,
      };
      cardId += 1;
      const stateAdded = listsState.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return stateAdded;
    case "DRAGGED":
      const { droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type } = action.payload;
      const newOrdered = [...listsState]

      // draggin lists around
      if (type === "list") {
        const list = newOrdered.splice(droppableIndexStart, 1);
        newOrdered.splice(droppableIndexEnd, 0, ...list);
        return newOrdered;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = listsState.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = listsState.find(list => droppableIdStart === list.id);
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = listsState.find(list => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newOrdered;
    default:
      return listsState;
  }
}
