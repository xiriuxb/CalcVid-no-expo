import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, Outlet, useLocation, useOutletContext} from 'react-router-native';

const AppBarTab = ({
  children,
  to,
  active,
}: {
  children: any;
  to: string;
  active?: boolean;
}) => {
  return (
    <Link
      to={to}
      style={active ? {...style.link, ...style.active} : style.link}>
      <Text style={style.text}>{children}</Text>
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
      <AppBarTab active={location.pathname == '/vidrios'} to="/vidrios">
        Vidrios
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
