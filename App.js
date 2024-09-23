import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import {ItemsProvider} from './screens/context/ItemsContext';
import CreateItemScreen from './screens/CreateItemScreen';
import AllItemsScreen from './screens/AllItemsScreen';
import TrashScreen from './screens/TrashScreen';

const Tab = createBottomTabNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    ...Ionicons.font,
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      await loadFonts();
      setFontLoaded(true);
    };

    loadResources();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <ItemsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName;
              if (route.name === 'Create') {
                iconName = 'add-circle-outline';
              } else if (route.name === 'All Items') {
                iconName = 'list-outline';
              } else if (route.name === 'Trash') {
                iconName = 'trash-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Create" component={CreateItemScreen} />
          <Tab.Screen name="All Items" component={AllItemsScreen} />
          <Tab.Screen name="Trash" component={TrashScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}
