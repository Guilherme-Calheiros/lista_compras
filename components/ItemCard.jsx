import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import Checkbox from "expo-checkbox";
import { styles } from "../style/CommonStyles";
import { Ionicons } from "@expo/vector-icons";

export default function ItemCard({ item, onRemover, onToggle, onEditar }) {
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(item.nome);

  const salvarEdicao = () => {
    onEditar(novoNome.trim());
    setEditando(false);
  };

  return (
    <View style={[styles.itemCard, {flexDirection:"row", alignItems:"center", justifyContent:"space-between"}]}>
      <Checkbox value={item.concluido} onValueChange={onToggle} />

      {editando ? (
        <View style={{flex:1, marginHorizontal:10}}>
          <TextInput 
            style={styles.input}
            value={novoNome}
            onChangeText={setNovoNome}
          />
          <Button title="Salvar" onPress={salvarEdicao} />
        </View>
      ) : (
        <Text style={{
          textDecorationLine: item.concluido ? "line-through" : "none",
          flex:1,
          marginHorizontal:10
        }}>
          {item.nome}
        </Text>
      )}

      <TouchableOpacity onPress={() => setEditando(!editando)}>
        <Ionicons name="pencil" size={20} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onRemover}>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}
