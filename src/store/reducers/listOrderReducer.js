let listId = 0;
const initialState = ["list-0"];

const listOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS_ADD_LIST": 
    listId += 1;
    const newId = `list-${listId}`;
      return [...state, newId];
    
    case "DRAGGED": {
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;
      const newState = state;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...pulledOutList);
        return newState;
      }
      return state;
    }
    case "SUCCESS_DELETE_LIST": {
      const { listId } = action.payload;
      return state.filter(id => id !== listId);
    }
    default:
      return state;
  }
};

export default listOrderReducer;