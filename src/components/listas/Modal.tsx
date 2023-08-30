import {useContext} from 'react';
import {View} from 'react-native';
import ItemModalContext from './context/PieceModalContext';
import ItemModal from './GlassPieceModal';
const ModalAuxComponent = () => {
  const {itemModalVisible} = useContext(ItemModalContext);
  return <View>{itemModalVisible && <ItemModal></ItemModal>}</View>;
};

export default ModalAuxComponent;
