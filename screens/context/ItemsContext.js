import React, {createContext, useState} from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const [trashItems, setTrashItems] = useState([]);

  const addItem = (text) => {
    setItems([...items, {id: Date.now(), text, completed: false}]);
  };

  const toggleComplete = (id) => {
    setItems(items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)));
  };

  const editItem = (id, newText) => {
    setItems(items.map((item) => (item.id === id ? {...item, text: newText} : item)));
  };

  const deleteItem = (id) => {
    const itemToDelete = items.find((item) => item.id === id);
    if (itemToDelete) {
      setTrashItems([...trashItems, itemToDelete]);
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const restoreItem = (id) => {
    const itemToRestore = trashItems.find((item) => item.id === id);
    if (itemToRestore) {
      setItems([...items, itemToRestore]);
      setTrashItems(trashItems.filter((item) => item.id !== id));
    }
  };

  const deleteForever = (id) => {
    setTrashItems(trashItems.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        trashItems,
        addItem,
        toggleComplete,
        editItem,
        deleteItem,
        restoreItem,
        deleteForever,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
