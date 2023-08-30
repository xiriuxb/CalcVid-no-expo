import React, {useState, useRef, useMemo} from 'react';
import ItemModalContext from './ItemModalContext';

const ItemModalProvider = React.memo(
  ({children}: {children: React.ReactElement}) => {
    const [itemModalVisible, setItemModalVisible] = useState(false);
    const editMode = useRef(false);
    const itemId = useRef('');
    const itemsToSellId = useRef('');

    const changeVisible = (visible: boolean, currentItemId?: string) => {
      setItemModalVisible(visible);
      itemsToSellId.current = currentItemId ? currentItemId : '';
    };

    const setEditMode = (value: boolean) => {
      editMode.current = value;
    };

    const setItemId = (id: string) => {
      itemId.current = id;
    };

    const contextValue = useMemo(
      () => ({
        itemModalVisible,
        setItemModalVisible: changeVisible,
        editMode: editMode.current,
        setEditMode,
        itemId: itemId.current,
        setItemId,
        itemsToSellId: itemsToSellId.current,
      }),
      [
        itemModalVisible,
        changeVisible,
        editMode.current,
        setEditMode,
        itemId.current,
        setItemId,
        itemsToSellId.current,
      ],
    );

    return (
      <ItemModalContext.Provider value={contextValue}>
        {children}
      </ItemModalContext.Provider>
    );
  },
);

export default ItemModalProvider;
