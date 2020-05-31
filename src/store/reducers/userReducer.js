const initialState = {};

export default function userReducer(userState = initialState, action) {
  switch (action.type) {
    case "CHANGE_INPUT_USER":
      return {
        ...userState,
        [action.payload.target.name]: action.payload.target.value,
      };
    case "SUCCESS_GET_BIO":
      return {
        ...userState,
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar,
      };
    case "SUCCESS_LOGIN":
      return {
        ...userState,
      };
    case "SUCCESS_LOGOUT":
      return {
        ...userState,
      };
    case "SUCCESS_SIGNUP":
      return {
        ...userState,
      };
    default:
      return userState;
  }
}