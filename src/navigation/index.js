
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        mode: 'modal'
    }
)

export default createAppContainer(StackNavigator)