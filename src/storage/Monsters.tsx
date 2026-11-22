export const yourMonsterStorage = [
    {
        id: '1',
        name: "Marolinho",
        monsterImg: "img/monsters/marolinho.jpg",
        attack: 3,
        defense: 3,
        life: 6
    },{
        id: '2',
        name: "Faíscal",
        monsterImg: "img/monsters/faiscal.jpg",
        attack: 4,
        defense: 2,
        life: 5
    },{
        id: '3',
        name: "Raizudo",
        monsterImg: "img/monsters/raizudo.jpg",
        attack: 2,
        defense: 3,
        life: 8
    },{
        id: '4',
        name: "Labareda",
        monsterImg: "img/monsters/labareda.jpg",
        attack: 3,
        defense: 3,
        life: 12
    }
]

export const opponentMonsterStorage = [
    {
        id: '1',
        name: "Nevoento",
        monsterImg: "img/monsters/nevoento.jpg",
        attack: 2,
        defense: 4,
        life: 4
    },{
        id: '2',
        name: "Esgotinho",
        monsterImg: "img/monsters/esgotinho.jpg",
        attack: 2,
        defense: 4,
        life: 6
    },{
        id: '3',
        name: "Jararaca",
        monsterImg: "img/monsters/jararaca.jpg",
        attack: 3,
        defense: 3,
        life: 6
    },{
        id: '4',
        name: "Escorpioso",
        monsterImg: "img/monsters/escorpioso.jpg",
        attack: 4,
        defense: 2,
        life: 5
    },{
        id: '5',
        name: "Abissal",
        monsterImg: "img/monsters/abissal.jpg",
        attack: 3,
        defense: 3,
        life: 16
    }
]
// Rankings salvos antes da troca dos personagens guardam o caminho antigo da imagem.
const imagensAntigas: { [antigo: string]: string } = {
    'img/monsters/squirtle.jpg': 'img/monsters/marolinho.jpg',
    'img/monsters/tartagua.jpg': 'img/monsters/marolinho.jpg',
    'img/monsters/charmander.jpg': 'img/monsters/faiscal.jpg',
    'img/monsters/bulbasaur.jpg': 'img/monsters/raizudo.jpg',
    'img/monsters/mega-charizard.jpg': 'img/monsters/labareda.jpg',
    'img/monsters/weezing.jpg': 'img/monsters/nevoento.jpg',
    'img/monsters/grimer.jpg': 'img/monsters/esgotinho.jpg',
    'img/monsters/arbok.jpg': 'img/monsters/jararaca.jpg',
    'img/monsters/skorupi.jpg': 'img/monsters/escorpioso.jpg',
    'img/monsters/dark-lugia.jpg': 'img/monsters/abissal.jpg',
}
export const imagemDoMonstro = (caminho?: string) =>
    caminho === undefined ? 'img/monsters/marolinho.jpg' : imagensAntigas[caminho] ?? caminho;
