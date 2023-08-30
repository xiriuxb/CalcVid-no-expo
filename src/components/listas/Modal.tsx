import {useContext} from 'react';
import {View} from 'react-native';
import ItemModal from './ItemModal';
import ItemModalContext from './context/modal-context/ItemModalContext';
const ModalAuxComponent = () => {
  const {itemModalVisible} = useContext(ItemModalContext);
  return <View>{itemModalVisible && <ItemModal></ItemModal>}</View>;
};

export default ModalAuxComponent;
