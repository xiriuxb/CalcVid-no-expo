import {useState, useRef} from 'react';
import PieceModalContext from './PieceModalContext';

const PieceModalProvider = ({children}: {children: React.ReactElement}) => {
  const [pieceModalVisible, setPieceModalVisible] = useState(false);
  const editMode = useRef(false);
  const glassPieceId = useRef('');

  const changeVisible = (visible: boolean) => {
    setPieceModalVisible(visible);
  };

  const setEditMode = (value: boolean) => {
    editMode.current = value;
  };

  const setGlassPieceId = (id: string) => {
    glassPieceId.current = id;
  };

  return (
    <PieceModalContext.Provider
      value={{
        pieceModalVisible,
        setPieceModalVisible: changeVisible,
        editMode: editMode.current,
        setEditMode,
        glassPieceId: glassPieceId.current,
        setGlassPieceId,
      }}>
      {children}
    </PieceModalContext.Provider>
  );
};

export default PieceModalProvider;
