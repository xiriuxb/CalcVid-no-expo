import {View, StyleSheet, Animated} from 'react-native';
import {Link, Outlet, useLocation} from 'react-router-native';

const anVal = new Animated.Value(1);

const handleShowUnderlay = Animated.spring(anVal, {
  toValue: 0.9,
  useNativeDriver: false,
});
const animatedSequence = () => {
  Animated.sequence([handleShowUnderlay, handleHideUnderlay]).start();
};

const handleHideUnderlay = Animated.spring(anVal, {
  toValue: 1,
  useNativeDriver: false,
});
const AppBarTab = ({
  children,
  to,
  active,
}: {
  children: React.ReactNode;
  to: string;
  active?: boolean;
}) => {
  return (
    <Link
      underlayColor={'#0004'}
      onShowUnderlay={animatedSequence}
      to={to}
      style={active ? {...style.link, ...style.active} : style.link}>
      <Animated.Text style={{...style.text, transform: [{scale: anVal}]}}>
        {children}
      </Animated.Text>
    </Link>
  );
};

export const AppBar = () => {
  const location = useLocation();

  return (
    <View style={style.appBar}>
      <AppBarTab active={location.pathname == '/'} to="/">
        Listas
      </AppBarTab>
      <AppBarTab active={location.pathname == '/products'} to="/products">
        Productos
      </AppBarTab>
      <Outlet />
    </View>
  );
};

const style = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    height: 50,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  link: {
    display: 'flex',
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
});
