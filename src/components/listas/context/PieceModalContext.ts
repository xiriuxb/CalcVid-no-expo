import {createContext} from 'react';

interface ContextTypes {
  pieceModalVisible: boolean;
  setPieceModalVisible: (visible: boolean) => void;
}

const PieceModalContext = createContext<ContextTypes>({
  pieceModalVisible: false,
  setPieceModalVisible: () => {},
});

export default PieceModalContext;
