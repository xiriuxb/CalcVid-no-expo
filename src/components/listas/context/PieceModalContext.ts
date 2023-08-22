import {createContext} from 'react';

interface ContextTypes {
  pieceModalVisible: boolean;
  setPieceModalVisible: (visible: boolean) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  glassPieceId: string;
  setGlassPieceId: (id: string) => void;
}

const PieceModalContext = createContext<ContextTypes>({
  pieceModalVisible: false,
  setPieceModalVisible: () => {},
  editMode: false,
  setEditMode: () => {},
  glassPieceId: '',
  setGlassPieceId: () => {},
});

export default PieceModalContext;
