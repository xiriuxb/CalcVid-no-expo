import {useContext} from 'react';
import {View} from 'react-native';
import GlassPieceModal from './GlassPieceModal';
import PieceModalContext from './context/PieceModalContext';
const ModalAuxComponent = () => {
  const {pieceModalVisible} = useContext(PieceModalContext);
  return (
    <View>{pieceModalVisible && <GlassPieceModal></GlassPieceModal>}</View>
  );
};

export default ModalAuxComponent;
