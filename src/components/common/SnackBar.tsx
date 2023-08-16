import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";

const SnackBarComponent = ({message, visible}) => {
    const [snackVisible, setSnackVisible] = useState();


    const hideSnackBar = () => {
        setSnackVisible(false);
      };
    return(
        <View style={{ position:'absolute',bottom:0,  left:0, right:0 }}>
              <Snackbar visible={snackVisible}
                duration={3000}
                onDismiss={hideSnackBar}
                action={{
                  label: 'Ocultar',
                  onPress: hideSnackBar,
                }}
                >
                  {message}
              </Snackbar>
        </View>
    )
}

export default SnackBarComponent;