import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, TextInput, FlatList, Alert } from 'react-native';
import { styles } from './style/CommonStyles';
import ItemCard from './components/ItemCard';
import { Item } from './model/Item';
import GestorStorage from './components/GestorStorage';

export default function App() {
  const gestor = new GestorStorage();
  const [nome, setNome] = useState('');
  const [itens, setItens] = useState([]);

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = async () => {
    const objs = await gestor.obterItens();
    setItens(objs);
  };

  const salvarItem = async () => {
    if (!nome.trim()) {
      alert("Preencha o nome do item");
      return;
    }

    const item = new Item(nome.trim());
    await gestor.adicionar(item);
    await carregarItens();

    setNome("");
  };

  const removerItem = async (nomeItem) => {
    await gestor.remover(nomeItem);
    await carregarItens();
  };

  const toggleItem = async (nomeItem) => {
    await gestor.toggleConcluido(nomeItem);
    await carregarItens();
  };

  const editarItem = async (nomeAntigo, novoNome) => {
    await gestor.editar(nomeAntigo, novoNome);
    await carregarItens();
  };

  const limparLista = async () => {
    Alert.alert("Confirmação", "Deseja excluir todos os itens?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
          await gestor.limpar();
          await carregarItens();
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Lista de Compras</Text>
        <View style={{ marginVertical: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Digite um item"
            value={nome}
            onChangeText={setNome}
          />
          <Button onPress={salvarItem} title="Adicionar item" />
        </View>
      </View>

      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={itens}
        keyExtractor={(item, index) => `${item.nome}-${index}`}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onRemover={() => removerItem(item.nome)}
            onToggle={() => toggleItem(item.nome)}
            onEditar={(novoNome) => editarItem(item.nome, novoNome)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      {itens.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Button color="red" title="Excluir todos" onPress={limparLista} />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
