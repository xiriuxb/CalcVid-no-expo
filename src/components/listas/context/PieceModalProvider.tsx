import {useState} from 'react';
import PieceModalContext from './PieceModalContext';

const PieceModalProvider = ({children}: {children: React.ReactElement}) => {
  const [pieceModalVisible, setPieceModalVisible] = useState(false);

  const changeVisible = (visible: boolean) => {
    setPieceModalVisible(visible);
  };
  return (
    <PieceModalContext.Provider
      value={{pieceModalVisible, setPieceModalVisible: changeVisible}}>
      {children}
    </PieceModalContext.Provider>
  );
};

export default PieceModalProvider;
