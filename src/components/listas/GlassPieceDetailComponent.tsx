import {useState, useContext, useEffect} from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import GlassPiece from '../../models/GlassPiece';
import {Button} from 'react-native-paper';
import globalStyles from '../common/Styles';
import PieceModalContext from './context/PieceModalContext';
import WindowsListContext from './context/WindowsListContext';
import Ventana from '../../models/Ventana';

const GlassPieceDetail = ({
  glassPiece,
  windowId,
}: {
  glassPiece: GlassPiece;
  windowId: string;
}) => {
  const [showPrecio, setShowPrecio] = useState('A');
  const {setPieceModalVisible, setEditMode, setGlassPieceId, glassPieceId} =
    useContext(PieceModalContext);

  const {selectedWindow, selectWindow, setListaVentanas, listaVentanas} =
    useContext(WindowsListContext);

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
    Alert.alert('Eliminar', 'Quiere eliminar el producto', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => console.log(selectedWindow?.name),
      },
      {text: 'OK', onPress: () => deleteElement()},
    ]);

  const openModalToEdit = () => {
    selectWindow(windowId);
    setEditMode(true);
    setGlassPieceId(glassPiece.id);
    setPieceModalVisible(true);
  };

  const handleToDelete = () => {
    setGlassPieceId(glassPiece.id);
    selectWindow(windowId, deleteElement);
  };

  const deleteElement = () => {
    const updatedWindow = selectedWindow!.deleteGlassPiece(glassPieceId);
    if (setListaVentanas) {
      setListaVentanas(
        listaVentanas.map((window: Ventana) => {
          if (window.id === selectedWindow!.id) {
            return updatedWindow;
          }
          return window;
        }),
      );
    }
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

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          style={{width: 10}}
          mode="text"
          textColor="red"
          onPress={handleToDelete}>
          {'Del'}
        </Button>
      </View>
    </View>
  );
};

export default GlassPieceDetail;
