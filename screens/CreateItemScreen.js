import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {ItemsContext} from './context/ItemsContext';

export default function CreateItemScreen({navigation}) {
  const [text, setText] = useState('');
  const {addItem} = useContext(ItemsContext);

  const handleAddItem = () => {
    addItem(text);
    setText('');
    navigation.navigate('All Items');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Create a new item</Text>
      <TextInput style={styles.input} placeholder="Item text" value={text} onChangeText={setText} />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
