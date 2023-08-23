import {createContext} from 'react';

interface ContextTypes {
  pieceModalVisible: boolean;
  setPieceModalVisible: (visible: boolean, currentWindowId?: string) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  glassPieceId: string;
  setGlassPieceId: (id: string) => void;
  windowId: string;
}

const PieceModalContext = createContext<ContextTypes>({
  pieceModalVisible: false,
  setPieceModalVisible: () => {},
  editMode: false,
  setEditMode: () => {},
  glassPieceId: '',
  setGlassPieceId: () => {},
  windowId: '',
});

export default PieceModalContext;
