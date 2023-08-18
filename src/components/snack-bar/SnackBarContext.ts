import {createContext, useContext, useState} from 'react';

interface SnackBarContextType {
  snackMessage: string;
  showSnackMessage: (message: string, duration: number) => void;
  hideSnackMessage: () => void;
  snackDuration: number;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined,
);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackBarProvider');
  }
  return context;
};

export default SnackBarContext;
