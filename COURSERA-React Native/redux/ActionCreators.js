import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../Shared/baseUrl';

export const fetchDishes = () => (dispatch) => {
  console.log("1.2.3......Okay suraj bhaiya!!")
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          console.log("Okay suraj bhaiya!!")
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};
// response => response.json() 
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
