import { ADD_PLACE, DELETE_PLACE, SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName,location,image) => {
    return dispatch => {
        dispatch(uiStartLoading()); 
        fetch("https://us-central1-reactnative-bad39.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
             const placeData = {
                 name: placeName,
                 location: location,
                 image: parsedRes.imageUrl
             };
             fetch("https://reactnative-bad39.firebaseio.com/places.json", {
                 method: "POST",
                 body: JSON.stringify(placeData)
             })
        })
        .catch(err => {
             console.log(err);
             dispatch(uiStopLoading());
         })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        //add catch
    }
 };

 export const getPlaces = () => {
    return (dispatch,getState) => {
        const token = getState().auth.token;
        if (!token) {
            return;
        }
        fetch("https://reactnative-bad39.firebaseio.com/places.json?auth="+token)
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                });
            }
            console.log(parsedRes);
            dispatch(setPlaces(places));
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

/*
export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
*/

export const deletePlace = (key) => {
    const deleteURL = "https://reactnative-bad39.firebaseio.com/places/" + key + ".json";
    return dispatch => {
        dispatch(removePlace(key));
        fetch(deleteURL,{method: "DELETE"})
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log("Deleted from server");
            //update store

        })
        //add catch
    }
}

export const removePlace = (key) => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
