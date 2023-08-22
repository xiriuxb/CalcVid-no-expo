import {useContext} from 'react';
import {View} from 'react-native';
import AddGlassPieceModal from './AddGlassPieceModal';
import PieceModalContext from './context/PieceModalContext';
const ModalAuxComponent = () => {
  const {pieceModalVisible} = useContext(PieceModalContext);
  return (
    <View>
      {pieceModalVisible && <AddGlassPieceModal></AddGlassPieceModal>}
    </View>
  );
};

export default ModalAuxComponent;
