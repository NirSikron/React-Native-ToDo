import React, {useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ItemsContext} from './context/ItemsContext';

export default function AllItemsScreen({navigation}) {
  const {items, toggleComplete, editItem, deleteItem} = useContext(ItemsContext);
  const [editingItem, setEditingItem] = useState(null);
  const [newText, setNewText] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewText(item.text);
  };

  const handleSaveEdit = () => {
    editItem(editingItem.id, newText);
    setEditingItem(null);
    setNewText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={item.completed ? styles.completed : styles.text}>{item.text}</Text>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                <Ionicons
                  name={item.completed ? 'checkbox' : 'square-outline'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Ionicons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {editingItem && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit item text"
            value={newText}
            onChangeText={setNewText}
          />
          <TouchableOpacity onPress={handleSaveEdit}>
            <Ionicons name="save" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
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
  text: {
    fontSize: 18,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
  },
  editContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    flex: 1,
  },
});
