import {View} from 'react-native';
import ItemModal from './ItemModal';
import {useItemModalContext} from './context';
const ModalAuxComponent = () => {
  const {itemModalVisible} = useItemModalContext();
  return <View>{itemModalVisible && <ItemModal></ItemModal>}</View>;
};

export default ModalAuxComponent;
