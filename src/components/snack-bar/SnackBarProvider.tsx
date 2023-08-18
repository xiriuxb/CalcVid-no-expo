import {useState, useRef} from 'react';
import SnackBarContext from './SnackBarContext';

export const SnackBarProvider = ({children}: {children: React.ReactNode}) => {
  const [snackMessage, setSnackMessage] = useState('');
  const snackDuration = useRef(3000);

  const showSnackMessage = (newMessage: string, duration: number) => {
    setSnackMessage(newMessage);
    snackDuration.current = duration;
  };

  const hideSnackMessage = () => {
    setSnackMessage('');
  };

  const contextValue = {
    snackMessage,
    showSnackMessage,
    hideSnackMessage,
    snackDuration: snackDuration.current,
  };

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
    </SnackBarContext.Provider>
  );
};
