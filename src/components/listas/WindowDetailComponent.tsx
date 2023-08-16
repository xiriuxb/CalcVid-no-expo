import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import globalStyles from '../common/Styles';
import Ventana from '../../models/Ventana';
import GlassPieceDetail from './GlassPieceDetailComponent';
import GlassPiece from '../../models/GlassPiece';

interface props {
  ventana: Ventana;
  changeModalVisible: (state: boolean) => void;
  setSelectedWindow: React.Dispatch<React.SetStateAction<Ventana | undefined>>;
}

const WindowDetailComponent = ({
  ventana,
  changeModalVisible,
  setSelectedWindow,
}: props) => {
  const changeCurrentWindow = () => {
    setSelectedWindow(ventana);
    changeModalVisible(true);
  };

  const addGlassPiece = (newGlassPiece: GlassPiece) => {
    ventana.setGlassPieces([...ventana.glassPieces, newGlassPiece]);
  };

  return (
    <View style={styles.ventana}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={[{fontSize: 18, fontWeight: 'bold'}]}>{ventana.name}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>M²: </Text>
          <Text style={globalStyles.sizedText}>
            {`${ventana.totalArea().toFixed(2)}`}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>TotalVidrios: </Text>
          <Text style={globalStyles.sizedText}>{ventana.totalGlasses()} </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>PrecioTotal: </Text>
          <Text style={globalStyles.sizedText}>
            {ventana.totalPriceA().toFixed(2)}{' '}
          </Text>
        </View>
      </View>
      <Text style={[globalStyles.sizedText]}>
        Alto x Ancho = Cant | m² (c/u) | m² | $ c/u | $
      </Text>
      {ventana.glassPieces.map(el => {
        return (
          <GlassPieceDetail glassPiece={el} key={el.id}></GlassPieceDetail>
        );
      })}
      <Button mode="contained-tonal" onPress={changeCurrentWindow}>
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  ventana: {
    padding: 5,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 5,
    flex: 1,
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
});

export default WindowDetailComponent;
