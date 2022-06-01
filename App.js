import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [state, setState] = useState(false);

  function handleToggle() {
    setState(!state);
  }

  useEffect(() => {
    Torch.switchState(state);
  }, [state]);

  useEffect(() => {
    const event = RNShake.addListener(() => {
      setState(oldState => !oldState);
    });
    return () => event.remove();
  }, []);

  return (
    <View style={state ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleToggle}>
        <Image
          style={state ? style.lightingOn : style.lightingOff}
          source={
            state
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    width: 150,
    tintColor: 'white',
    height: 150,
  },
});
