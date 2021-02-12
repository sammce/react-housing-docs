import React from 'react';

const Context = React.createContext(
    {
        dark: false
    }
)
const Provider = (props) => {
    const { children } = props;
    return (
        <Context.Provider value={{}}>{children}</Context.Provider>
    )
}

export const use