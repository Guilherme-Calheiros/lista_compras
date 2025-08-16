import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_LISTA = "listaItens";

const salvarLista = async (lista) => {
  try {
    const jsonValue = JSON.stringify(lista);
    await AsyncStorage.setItem(CHAVE_LISTA, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const obterLista = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CHAVE_LISTA);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default class GestorStorage {
  async adicionar(item) {
    const listaAtual = await obterLista();
    listaAtual.push({ ...item, concluido: false });
    await salvarLista(listaAtual);
  }

  async remover(nomeItem) {
    let listaAtual = await obterLista();
    listaAtual = listaAtual.filter(i => i.nome !== nomeItem);
    await salvarLista(listaAtual);
  }

  async editar(nomeAntigo, novoNome) {
    let listaAtual = await obterLista();
    listaAtual = listaAtual.map(i => 
      i.nome === nomeAntigo ? { ...i, nome: novoNome } : i
    );
    await salvarLista(listaAtual);
  }

  async toggleConcluido(nomeItem) {
    let listaAtual = await obterLista();
    listaAtual = listaAtual.map(i =>
      i.nome === nomeItem ? { ...i, concluido: !i.concluido } : i
    );
    await salvarLista(listaAtual);
  }

  async limpar() {
    await salvarLista([]);
  }

  async obterItens() {
    return await obterLista();
  }
}
