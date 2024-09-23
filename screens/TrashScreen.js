import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ItemsContext} from './context/ItemsContext';

export default function TrashScreen() {
  const {trashItems, restoreItem, deleteForever} = useContext(ItemsContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={trashItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => restoreItem(item.id)}>
                <Ionicons name="refresh" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteForever(item.id)}>
                <Ionicons name="close-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
  },
});
