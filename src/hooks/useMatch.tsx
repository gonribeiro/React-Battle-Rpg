import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import { useAuth } from '../hooks/useAuth';
import { useSaveStory } from '../hooks/useSaveStory';

import { yourMonsterStorage, opponentMonsterStorage } from "../storage/Monsters";
import storyStorage from '../storage/Stories';

type MatchType = {
    turn: boolean;
    remedy: number;
    maximumPower: number;
    opponentMonsterNumber: number;
}

type MonsterType = {
    id: string;
    name: string;
    attack: number;
    defense: number;
    life: number;
    monsterImg: string;
}

export function useMatch() {
    const { user, signInWithGoogle } = useAuth();
    const { storyValue, updateStoryValue } = useSaveStory();
    const history = useHistory();
    const locationUrl = useLocation();
    const [selectedMonster, setSelectedMonster] = useState(
        Cookies.get('monsterSelected') === undefined ? 0 : Number(Cookies.get('monsterSelected'))
    );

    const [match, setMatch] = useState<MatchType>({
        turn: true,
        remedy: 2,
        maximumPower: 2,
        opponentMonsterNumber: 0
    });
    const [battleSituation, setBattleSituation] = useState(String);
    const [battleStatus, setBattleStatus] = useState(String);

    const [opponentMonster, setOpponentMonster] = useState<MonsterType>({...opponentMonsterStorage[0]});
    const [yourMonster, setYourMonster] = useState<MonsterType>({...yourMonsterStorage[selectedMonster]});

    useEffect(() => {
        if (locationUrl.pathname === '/story-battle') {
            setOpponentMonster({...opponentMonsterStorage[storyValue.opponentMonsterNumber]});
            setYourMonster({...yourMonsterStorage[storyValue.yourMonsterNumber]});
            setMatch({
                ...match,
                remedy: storyValue.remedy,
                maximumPower: storyValue.maximumPower
            })
        } else { // treino
            setOpponentMonster({...opponentMonsterStorage[match.opponentMonsterNumber]});
            setYourMonster({
                ...yourMonsterStorage[selectedMonster]
            });
        }
    }, [match.opponentMonsterNumber]);

    function selectMonster(number: number) {
        setSelectedMonster(number);

        Cookies.set('monsterSelected', String(number));
    }

    async function gameMode(mode: String) {
        if (mode === 'new-game' || mode === 'select-monster') {
            if (!user) {
                await signInWithGoogle();
            }

            if (mode === 'select-monster') {
                history.push('/select-monster');
                return;
            }

            updateStoryValue({ // Parâmetros para novo jogo do modo história
                opponentMonsterNumber: 0,
                yourMonsterNumber: selectedMonster,
                monsterImage: yourMonsterStorage[selectedMonster].monsterImg,
                storyNumber: 0,
                remedy: 2,
                maximumPower: 2,
                inGame: true,
                score: 0
            })

            history.push('/story-mode');
            return;
        }

        history.push('/'+mode);
    }

    function fighting() {
        let attacker = match.turn ? yourMonster : opponentMonster;
        let defender = match.turn ? opponentMonster : yourMonster;

        // Bônus somado ao ataque e defesa
        let attackChance = Math.floor(Math.random() * 6) + 1;
        let defenseChance = Math.floor(Math.random() * 6) + 1;

        let battleResult = (attacker.attack + attackChance) - (defender.defense + defenseChance);

        if (battleResult > 0) {
            defender.life -= battleResult; //@todo rever
            setBattleSituation(defender.name + ' sofreu ' + battleResult + ' de dano!');

            if (defender.life <= 0) {
                aftermath(attacker.name);
            }
        } else {
            setBattleSituation(defender.name + ' defendeu!')
        }

        setBattleStatus(
            attacker.name + ' usou ' + (attacker.attack + attackChance) + ' de ataque! ' +
            defender.name + ' usou ' + (defender.defense + defenseChance) + ' de defesa!'
        )

        setMatch({...match, turn: !match.turn});
    }

    function item(item: string) {
        if (item === 'remedy' && match.remedy > 0) {
            if (locationUrl.pathname === '/story-battle') {
                updateStoryValue({...storyValue, remedy: storyValue.remedy - 1});
            }

            setMatch({...match, remedy: match.remedy - 1, turn: false});
            setYourMonster({...yourMonster, 
                life: Number(yourMonster.id) - 1 === selectedMonster ? yourMonsterStorage[selectedMonster].life : 12
            });
            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        } else if (item === 'maximumPower' && match.maximumPower > 0){
            if (locationUrl.pathname === '/story-battle') {
                updateStoryValue({...storyValue, maximumPower: storyValue.maximumPower - 1});
            }

            setMatch({...match, maximumPower: match.maximumPower - 1, turn: false});
            setYourMonster({...yourMonster, attack: yourMonster.attack + 3});
            setBattleSituation(yourMonster.name + ' ganhou + 3 de ataque!');
        } else {
            setBattleSituation('Você não possui mais esse item.');
        }
    }

    function aftermath(attackerName: string) {
        // Modo história
        // @todo useMatch não deveria atualizar informações do modo história
        if (locationUrl.pathname === '/story-battle') {
            let score = storyValue.score + 100 + (storyValue.remedy * 100) + (storyValue.maximumPower * 100) + (yourMonster.life * 10);

            if (opponentMonster.life <= 0 && opponentMonster.id !== '5') { // Próxima história
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.callBattle === storyValue.opponentMonsterNumber) + 1,
                    opponentMonsterNumber: storyValue.opponentMonsterNumber + 1,
                    score: score
                });
            } else if (
                yourMonster.life <= 0 && opponentMonster.id === '5' && yourMonster.id !== '4'
            ) { // Ultima chance
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'part5'),
                    yourMonsterNumber: 3
                });
            } else if (yourMonster.life <= 0) {
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'bad-ending'),
                    inGame: false
                });
            } else if (opponentMonster.life <= 0 && yourMonster.id === '4') {
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'good-ending'),
                    score: score,
                    inGame: false,
                });
            } else if (opponentMonster.life <= 0) {
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'secret-ending'),
                    score: score + 1000,
                    inGame: false,
                });
            }

            return;
        }

        // Modo treino
        if (opponentMonster.life <= 0) {
            setBattleSituation(attackerName + ' venceu!');
            if (match.opponentMonsterNumber !== 4) {
                setMatch({
                    ...match,
                    turn: true
                });
            }
        } else {
            setBattleSituation(attackerName + ' venceu! Fim de jogo.');
        }
    }

    function continueGame() {
        if (locationUrl.pathname === '/story-battle') {
            history.push('/story-mode');
        } else {
            setMatch({...match, opponentMonsterNumber: match.opponentMonsterNumber + 1 });
        }
    }

    return {
        gameMode,
        fighting,
        item,
        continueGame,
        match,
        battleSituation,
        battleStatus,
        yourMonster,
        opponentMonster,
        selectMonster,
        selectedMonster
    };
}