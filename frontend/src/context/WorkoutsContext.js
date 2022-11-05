import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => { // mipuli sa useState nga hook state=current then action mao ang set 
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      };
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts]
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id) // if true through it out from the array
      };
    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  });
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}