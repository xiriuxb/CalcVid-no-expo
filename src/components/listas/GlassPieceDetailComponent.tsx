import {useState} from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GlassPiece from '../../models/GlassPiece';
import {Button} from 'react-native-paper';
import globalStyles from '../common/Styles';

const GlassPieceDetail = ({glassPiece}: {glassPiece: GlassPiece}) => {
  const [showPrecio, setShowPrecio] = useState('A');
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
        <TouchableWithoutFeedback>
          <Text style={globalStyles.sizedText}>
            {`${glassPiece.width} x ${glassPiece.height} =${glassPiece.quantity} | ${glassPiece.glassType.name}`}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Text style={{textAlign: 'center'}}>
        {`${glassPiece.individualArea()}\n${glassPiece.totalArea()}`}
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
          icon="trash-can">
          {''}
        </Button>
      </View>
    </View>
  );
};

export default GlassPieceDetail;
