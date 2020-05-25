// const initialState = [
//   {
//     title: "First List",
//     id: `list-${0}`,
//     cards: [
//       {
//         id: `card-${0}`,
//         text: "First card",
//       },
//       {
//         id: `card-${1}`,
//         text: "Second card",
//       },
//     ],
//   },
//   {
//     title: "Second List",
//     id: `list-${1}`,
//     cards: [
//       {
//         id: `card-${2}`,
//         text: "First card",
//       },
//       {
//         id: `card-${3}`,
//         text: "Second card",
//       },
//       {
//         id: `card-${4}`,
//         text: "Third card",
//       },
//     ],
//   },
// ];

const initialState = {
  allList: [],
  isLoading : false,
};

export default function listsReducer(listsState = initialState, action) {
  switch (action.type) {
    case "SUCCESS_GET_LIST":
      return {
        ...listsState,
        allList: action.payload,
        isLoading : false,

      };
    case "SUCCESS_CREATE_LIST":
      return {
        ...listsState,
        isLoading : true,
      };
    case "CHANGE_INPUT_LIST":
      return {
        ...listsState,
        [action.payload.target.name]: action.payload.target.value,
      };
    case "DRAGGED":
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      const allList = [...listsState.allList];

      // draggin lists around
      if (type === "list") {
        const list = allList.splice(droppableIndexStart, 1);
        allList.splice(droppableIndexEnd, 0, ...list);
        return allList;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = allList.find((list) => droppableIdStart === String(list.id));
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = allList.find(
          (list) => droppableIdStart === String(list.id)
        );
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = allList.find((list) => droppableIdEnd === String(list.id));

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return listsState;
    default:
      return listsState;
  }
}
