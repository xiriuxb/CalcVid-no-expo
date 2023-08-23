import {useState, useContext} from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import GlassPiece from '../../models/GlassPiece';
import {Button, TouchableRipple} from 'react-native-paper';
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
  const [showPrecio, setShowPrecio] = useState('A');
  const {setPieceModalVisible, setEditMode, setGlassPieceId} =
    useContext(PieceModalContext);
  const {deletePiece} = useContext(WindowsListContext);

  const changePrice = () => {
    switch (showPrecio) {
      case 'A':
        setShowPrecio('B');
        break;
      case 'B':
        setShowPrecio('C');
        break;
      default:
        setShowPrecio('A');
        break;
    }
  };

  const showDifPrice = (el: GlassPiece) => {
    switch (showPrecio) {
      case 'A':
        return `${el.individualPriceA().toFixed(2)}\n${el
          .totalPriceA()
          .toFixed(2)}`;
      case 'B':
        return `${el.individualPriceB().toFixed(2)}\n${el
          .totalPriceB()
          .toFixed(2)}`;
      default:
        return `${el.individualPriceC().toFixed(2)}\n${el
          .totalPriceC()
          .toFixed(2)}`;
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Eliminar', '¿Quiere eliminar?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deletePiece(windowId, glassPiece.id)},
    ]);

  const openModalToEdit = () => {
    setEditMode(true);
    setGlassPieceId(glassPiece.id);
    setPieceModalVisible(true, windowId);
  };

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
        <TouchableHighlight onPress={openModalToEdit}>
          <Text style={globalStyles.sizedText}>
            {`${glassPiece.width} x ${glassPiece.height} =${glassPiece.quantity} | ${glassPiece.glassType.name}`}
          </Text>
        </TouchableHighlight>
      </View>
      <Text style={{textAlign: 'center'}}>
        {`${glassPiece.individualArea().toFixed(2)}\n${glassPiece
          .totalArea()
          .toFixed(2)}`}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={{alignSelf: 'center'}}>{showPrecio} </Text>
        <TouchableHighlight onPress={changePrice}>
          <Text style={globalStyles.sizedText}>{showDifPrice(glassPiece)}</Text>
        </TouchableHighlight>
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
