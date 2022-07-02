import store from '../store/store';

// This is a closure that allows to know if the game is  some specific values of an array of objects.   
const isGameAddedAsClosure = id => prop => store.getState().userGames[prop].includes(id);
export default isGameAddedAsClosure;
