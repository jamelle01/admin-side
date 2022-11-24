import { createContext, useReducer } from 'react';

export const UsersContext = createContext();

// mao gamit na code para mag update ang display like nighuman add 
export const usersReducer = (state, action) => { // mipuli sa useState nga hook state=current then action mao ang set 
  switch (action.type) {              
    case 'SET_USERS':
      return { 
        users: action.payload 
      };
    case 'CREATE_USER':
      return { 
        users: [action.payload, ...state.users]
      };
    case 'DELETE_USER':
      return {
        users: state.users.filter((w) => w._id !== action.payload._id) // if true throw it out from the array
      };
    default:
      return state;
  }
}

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, { 
    users: null
  });
  
  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      { children }
    </UsersContext.Provider>
  )
}