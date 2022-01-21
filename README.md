<h1 align="center">
    React Battle Rpg
</h1>

<p align="center">
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=orange&labelColor=121214" alt="License">

  <img src="https://img.shields.io/github/forks/gonribeiro/React-Battle-Rpg?label=forks&message=MIT&color=orange&labelColor=121214" alt="Forks">

  <img src="https://img.shields.io/github/stars/gonribeiro/React-Battle-Rpg?label=stars&message=MIT&color=orange&labelColor=121214" alt="Stars">
</p>

![Game](.github/game.png)

## 🎮 O Jogo

É um pequeno jogo de batalhas por turnos escrito em ReactJS. Criado para colocar em prática o conhecimento obtido com a biblioteca até o momento através de um projeto pessoal.

Possui:

- Modo História (com três finais possíveis: ruim, bom e secreto);
- Modo Treino;
- Ranking mostrando a pontuação obtida no modo história.

Para conhecer e jogar, acesse: https://react-battle-rpg.web.app/.

(As telas são responsivas, portanto, sinta-se a vontade para jogar em qualquer dispositivo).

## 🧪 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://material-ui.com/)
- [Mui-Datatable](https://github.com/gregnb/mui-datatables)
- [Js-Cookie](https://github.com/js-cookie/js-cookie)

## 🚀 Iniciando localmente em seu PC

Até a versão [versão 1.2beta](https://github.com/gonribeiro/React-Battle-Rpg/releases/tag/v1.2.0-beta) você consegue iniciar o projeto sem nenhuma configuração extra. Basta apenas clonar o projeto, instalar as dependências, iniciá-lo e pronto.

Para executar a última versão disponível, você precisará configurar o firebase. Acesse o site do [Firebase](https://firebase.google.com/), crie uma conta e um projeto. Ao chegar na etapa de "Adicionar o SDK do Firebase", copie todas as informações de "const firebaseConfig = { ... }". Faça uma cópia do arquivo ".env.local.example" alterando seu nome para ".env.local". Cole todas as informações contidas no "firebaseConfig" no arquivo "env.local"  de acordo com a informação solicitada. Instale o projeto, execute e pronto.

```bash
$ git clone https://github.com/gonribeiro/React-Battle-Rpg # clone o projeto
$ cd React-Battle-Rpg # Acesse
$ yarn # Instale as dependências
$ yarn start # Inicie o projeto
```
O aplicativo estará disponível para acesso em seu navegador em http://localhost:3000

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo de [LICENÇA](LICENSE.md) para detalhes

---
<p align="center">História e Jogo criado por 💜 Tiago Ribeiro</p>