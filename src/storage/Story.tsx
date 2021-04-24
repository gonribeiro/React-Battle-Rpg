const Story = [
    { // Part 1
        text: '"Há um ano."',
    },{
        text: '"Devido a problemas na rede saneamento básico a população recebe água com altos níveis de geosmina. Segundo as autoridades, não é nocivo a saúde."',
    },{
        textImg: 'img/story/doctor.jpg',
        text: '"Entretanto, a três dias, médicos relatam receber pacientes graves, informando ter passado mal depois de beber a água mesmo filtrada."',
    },{
        text: '[Gravando pelo celular]',
    },{
        text: '"04 de abril, 3 horas da madrugada."',
    },{
        text: '"Minhas investigações sobre a água me trouxeram a uma fábrica abandonada no interior do estado."',
    },{
        textImg: 'img/story/sewer.jpg',
        text: '"Passei o dia observando à distância, e mesmo abandonada, uma grande quantidade de um estranho líquido saía por canos da fábrica direto para o rio. E não parece ser simplesmente esgoto."',
    },{
        text: '"Se alguém está causando tudo isso, eu vou descobrir. Aqui é a repórter Adriana do Jornal da Noite."',
    },{
        text: '[Adriana dá a volta pelo rio e chega na única entrada. Ao entrar na fábrica, é surpreendida!]',
        callBattle: 0
    },{ // Part 2
        text: '"Foi um grande susto. Fomos atacados de repente."'
    },{
        text: '"Pelo que sei, não é comum avistar aquela espécie nessa região."'
    },{
        textImg: 'img/story/abandoned-industry.jpg',
        text: '[Adriana caminha pela fábrica e acessa algumas salas do prédio em busca de informações.]'
    },{
        text: '[Ao acessar uma das salas, um novo ataque acontece!]',
        callBattle: 1
    },{ // Part 3
        text: '"Ok, ok... Temos que tomar mais cuidado. Dois ataques de surpresa, não quero um terceiro."'
    },{
        text: '"Aquela outra espécie, também não é comum nessa região. Ambos estavam com um comportamento estranho. Se escondendo na escuridão, atacando de surpresa e muito agressivos."'
    },{
        textImg: 'img/story/stairs.jpg',
        text: '[Adriana avista uma escada que leva ao subsolo da fábrica. Ela desce silenciosamente temendo um novo ataque surpresa.]'
    },{
        text: '[Ao chegar no final das escadas, avista dois monstrinhos.]'
    },{
        text: '"Dessa vez, nós que atacaremos primeiro."',
        callBattle: 2
    },{
        text: '"Vitória garantida, vamos para a próxima!"',
        callBattle: 3
    },{ // Part 4
        text: '"Vencemos, vencemos! Quatro vitória só hoje!"'
    },{
        text: '[Porém...]'
    },{
        text: '[Um rugido surge das sombras.]'
    },{
        text: '[Olhos parecem a observar.]'
    },{
        text: '"Nada bom."'
    },{
        text: '[Algo corre ferozmente na direção da Adriana!]'
    },{
        text: '[Adriana foge subindo as escadas. No desespero, deixa o seu celular cair no chão.]'
    },{
        text: '[O que a persegue sente dificuldades em passar pelas estreitas escadas, sobe se debatendo e isso o atrasa.]'
    },{
        text: '[Enquanto ele se debate, pisa no celular o quebrando.]'
    },{
        text: '[Adriana sai das escadas e corre. O que a perseguia também consegue sair e levanta voo. Adriana se surpreende...!]'
    },{
        text: '[Ele é um...]',
        callBattle: 4
    },{ // Part 5
        text: '[Adriana perde a batalha!]'
    },{
        text: '"Não temos como vencê-lo..."'
    },{
        text: '[Adriana abraça seu monstrinho enquanto o oponente prepara um último golpe.]'
    },{
        text: '"É o fim..."'
    },{
        text: '[Na direção aposta, algo voa rapidamente até eles e defende o ataque!]'
    },{
        text: '[Uma grande explosão acontece! E uma nova batalha se inicia!]',
        callBattle: 4
    },{ // Bad ending
        text: '"NÃO!"'
    },{
        text: '[Adriana abraça seu monstrinho enquanto o oponente prepara um último golpe.]'
    },{
        text: '[Ambos são atingidos por um feroz ataque!]'
    },{
        text: '[[[ FIM DE JOGO. Tente novamente. ]]]',
        endingGame: true
    },{ // Good ending
        text: '"Vencemos! Estamos a salvos!"'
    },{
        text: '[Ambos os monstros, após o último ataque, interrompem a batalha.]'
    },{
        text: '[Cada um dos dois voa em diferentes direções deixando a fábrica para trás.]'
    },{
        text: '[Adriana mais que de pressa socorre seu monstrinho.]'
    },{
        text: '"Você necessita de cuidados urgentes!"'
    },{
        text: '[Adriana corre para o seu carro e acelera até a cidade em busca de um centro médico.]'
    },{
        text: '[...]'
    },{
        text: '[Horas mais tarde.]'
    },{
        text: 'Enfermeira: "Você deve ir para casa. Já informamos que ele não corre mais nenhum perigo. Nós ligamos assim que ele tiver alta."'
    },{
        text: 'Adriana: "Obrigada pela preocupação. Estou bem aqui."'
    },{
        text: 'Enfermeira: "Tudo bem. Se precisar de algo, pode me chamar."'
    },{
        text: 'Adriana: "Obrigada."'
    },{
        text: '[Adriana fica sozinha.]'
    },{
        text: '"Afinal, o que era aquilo que nos atacou e por que todos naquela fábrica estavam com um comportamento muito agressivo?. ... ...Será que possui alguma relação com aquela água sendo jogada no rio e as doenças...?"'
    },{
        text: '[...]'
    },{
        text: '[Dias depois.]'
    },{
        text: '"Você tem certeza que quer me acompanhar? ...Ha ha, tudo bem! ...Mas dessa vez teremos mais cuidados. Não quero te ver no hospital novamente. As autoridades ignoraram a nossa história, o jornal me proibiu de continuar com essa investigação temendo o nosso pior. Mas uma boa jornalista não corre da notícia."'
    },{
        text: '"Vamos, dessa vez, nós iremos até o fim!"'
    },{
        text: '[[[ PARABÉNS! VOCÊ FINALIZOU O JOGO! Jogue novamente e tente alcançar o final secreto! Até mais! ]]]',
        endingGame: true
    },{ // Secret ending
        text: '[Adriana e seu monstrinho lutam bravamente! Mas são atingidos por um poderoso ataque! Ambos caem muito feridos no chão.]'
    },{
        text: '"Ele é forte demais..."'
    },{
        text: '[O monstrinho de Adriana se levanta com muitas dificuldades.]'
    },{
        text: '"Pare, por favor, não lute mais..."'
    },{
        text: '"Fuja."'
    },{
        text: '[O monstrinho de Adriana começa a tomar uma nova forma!]'
    },{
        text: '"Você está... Evoluindo!"'
    },{
        text: '[Ele se torna mais forte e prepara um novo ataque!]'
    },{
        text: '"Mais uma vez... Ataque com força total!"'
    },{
        text: '[Um grande golpe é lançado e uma explosão acontece!]'
    },{
        text: '[O oponente, ferido, foge da batalha.]'
    },{
        text: '"Vencemos! Vencemos! Vencemos!"'
    },{
        text: '[Alguns minutos depois. Adriana se recupera um pouco da batalha.]'
    },{
        text: '"Não se preocupe, eu estou bem. Mas olhe, o celular com todos os registros está destruído."'
    },{
        text: '[Adriana deixa a fábrica.]'
    },{
        text: '"Aquela água parou de jorrar. Não sei o que está acontecendo com este lugar, o porque daqueles monstros estarem tão agressivos. E ainda há aquele voador em uma forma jamais vista."'
    },{
        text: '"Vamos meu amigo, nós temos uma grande matéria a investigar!"'
    },{
        text: '[[[ PARABÉNS! VOCÊ FINALIZOU O JOGO COM O FINAL SECRETO! Espero que tenha se divertido com essa mini aventura! Até mais! ]]]',
        endingGame: true
    }
]

export default Story;