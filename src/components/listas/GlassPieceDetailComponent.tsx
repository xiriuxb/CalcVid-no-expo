import {useContext, useMemo} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import GlassPiece from '../../models/Item';
import {TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import PieceModalContext from './context/PieceModalContext';
import WindowsListContext from './context/WindowsListContext';

const GlassPieceDetail = ({
  glassPiece,
  windowId,
}: {
  glassPiece: GlassPiece;
  windowId: string;
}) => {
  const {setPieceModalVisible, setEditMode, setGlassPieceId} =
    useContext(PieceModalContext);
  const {deletePiece, reloadTotals} = useContext(WindowsListContext);

  const changePrice = useMemo(() => {
    return () => {
      glassPiece.autoSetSelectedPrice();
      reloadTotals();
    };
  }, []);

  const createTwoButtonAlert = useMemo(() => {
    return () => {
      Alert.alert('Eliminar', '¿Quiere eliminar?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deletePiece(windowId, glassPiece.id)},
      ]);
    };
  }, []);

  const openModalToEdit = useMemo(() => {
    return () => {
      setEditMode(true);
      setGlassPieceId(glassPiece.id);
      setPieceModalVisible(true, windowId);
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'black',
      }}>
      <View>
        <TouchableOpacity onPress={openModalToEdit}>
          <Text style={globalStyles.sizedText}>
            {`${glassPiece.width} x ${glassPiece.height} =${glassPiece.quantity} | ${glassPiece.product.name}`}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{textAlign: 'center'}}>
        {`${glassPiece.individualArea.toFixed(
          2,
        )}\n${glassPiece.totalArea.toFixed(2)}`}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={{alignSelf: 'center'}}>{glassPiece.selectedPrice} </Text>
        <TouchableOpacity onPress={changePrice}>
          <View>
            <Text style={globalStyles.sizedText}>
              {glassPiece.individualPrice().toFixed(2)}
            </Text>
            <Text style={globalStyles.sizedText}>
              {glassPiece.totalPrice.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableRipple onPress={createTwoButtonAlert}>
        <Text style={[globalStyles.boldText, globalStyles.errorText]}>
          Eliminar
        </Text>
      </TouchableRipple>
    </View>
  );
};

export default GlassPieceDetail;
