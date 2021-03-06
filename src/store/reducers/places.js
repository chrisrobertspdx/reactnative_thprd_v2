import {
  ADD_PLACE,
  DELETE_PLACE,
  SET_PLACES,
  REMOVE_PLACE
} from "../actions/actionTypes";

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          image: {
            uri: action.image.uri
          },
          location: action.location
        })
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      }
    default:
      return state;
  }
};

export default reducer;
