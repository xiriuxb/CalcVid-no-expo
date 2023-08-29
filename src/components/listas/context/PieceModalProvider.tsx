import React, {useState, useRef, useMemo} from 'react';
import PieceModalContext from './PieceModalContext';

const PieceModalProvider = React.memo(
  ({children}: {children: React.ReactElement}) => {
    const [pieceModalVisible, setPieceModalVisible] = useState(false);
    const editMode = useRef(false);
    const glassPieceId = useRef('');
    const windowId = useRef('');

    const changeVisible = (visible: boolean, currentWindowId?: string) => {
      setPieceModalVisible(visible);
      windowId.current = currentWindowId ? currentWindowId : '';
    };

    const setEditMode = (value: boolean) => {
      editMode.current = value;
    };

    const setGlassPieceId = (id: string) => {
      glassPieceId.current = id;
    };

    const contextValue = useMemo(
      () => ({
        pieceModalVisible,
        setPieceModalVisible: changeVisible,
        editMode: editMode.current,
        setEditMode,
        glassPieceId: glassPieceId.current,
        setGlassPieceId,
        windowId: windowId.current,
      }),
      [
        pieceModalVisible,
        changeVisible,
        editMode.current,
        setEditMode,
        glassPieceId.current,
        setGlassPieceId,
        windowId.current,
      ],
    );

    return (
      <PieceModalContext.Provider value={contextValue}>
        {children}
      </PieceModalContext.Provider>
    );
  },
);

export default PieceModalProvider;
