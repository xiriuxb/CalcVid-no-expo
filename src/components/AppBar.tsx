import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Link, Outlet} from 'react-router-native';

const AppBarTab = ({
  active,
  children,
  to,
}: {
  active: boolean;
  children: any;
  to: string;
}) => {
  return (
    <Link to={to}>
      <Text style={style.text}>{children}</Text>
    </Link>
  );
};

export const AppBar = () => {
  return (
    <View style={style.appBar}>
      <AppBarTab active to="/">
        Listas
      </AppBarTab>
      <AppBarTab active to="/vidrios">
        Vidrios
      </AppBarTab>
      <Outlet />
    </View>
  );
};

const style = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#6200ee',
  },
  text: {
    color: '#fff',
    width: 100,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
