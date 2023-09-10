import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  children: JSX.Element;
  showMore: boolean;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
}

const TouchableShowMore = ({children, showMore, setShowMore, style}: Props) => {
  const handleShowDetails = () => {
    setShowMore(!showMore);
  };

  return (
    <TouchableOpacity
      onPress={handleShowDetails} style={[styles.touchable, style]}
      >
      <View style={{flex: 1}}>{children}</View>
      <FontAwesome
        name={showMore ? 'chevron-up' : 'chevron-down'}
        size={17}
        style={{paddingTop: 3, paddingHorizontal: 4}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
    paddingHorizontal:3,
  },
});

export default TouchableShowMore;
