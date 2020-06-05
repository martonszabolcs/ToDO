import React from 'react';

import Home from '../screens/Home';
import AddItem from '../screens/AddItem';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
const screenWidth = Math.round(Dimensions.get('window').width);

class AppNavigator extends React.PureComponent<Props> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen
            name="Home"
            options={{gestureEnabled: false}}
            component={Home}
          />
          <Stack.Screen
            name="AddItem"
            options={{gestureEnabled: false}}
            component={AddItem}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(dispatchToProps)(AppNavigator);
