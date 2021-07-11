import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from '../hooks/useAuth';
import { useSaveStory } from '../hooks/useSaveStory';

import { yourMonsterStorage, opponentMonsterStorage } from "../storage/Monsters";
import storyStorage from '../storage/Stories';

type MonsterType = {
    id: string;
    name: string;
    attack: number;
    defense: number;
    life: number;
    monsterImg: string;
}

type ItensType = {
    remedy: number;
    maximumPower: number;
}

export function useMatch() {
    const { user, signInWithGoogle } = useAuth();
    const { storyValue, updateStoryValue } = useSaveStory();

    const history = useHistory();
    const locationUrl = useLocation();
    
    const [turn, setTurn] = useState(true);
    const [battleSituation, setBattleSituation] = useState(String);
    const [battleStatus, setBattleStatus] = useState(String);
    const [yourItens, setYourItens] = useState<ItensType>({remedy: 2, maximumPower: 2});
    const [yourMonster, setYourMonster] = useState<MonsterType>({...yourMonsterStorage[0]});
    const [opponentMonster, setOpponentMonster] = useState<MonsterType>({...opponentMonsterStorage[0]});
    const [opponentMonsterNumber, setOpponentMonsterNumber] = useState(0);

    useEffect(() => {
        if (locationUrl.pathname === '/story-battle') {
            setOpponentMonster({...opponentMonsterStorage[storyValue.opponentMonsterNumber]});
            setYourMonster({...yourMonsterStorage[storyValue.yourMonsterNumber]});
            setYourItens({
                remedy: storyValue.remedy,
                maximumPower: storyValue.maximumPower
            })
        } else { // treining
            setOpponentMonster({...opponentMonsterStorage[opponentMonsterNumber]});
            setYourMonster({...yourMonsterStorage[0]});
        }
    }, [opponentMonsterNumber]);

    async function gameMode(mode: String) {
        if (mode === 'new-game') { // Parâmetros para novo jogo do modo história
            if (!user) {
                await signInWithGoogle();
            }

            updateStoryValue({
                opponentMonsterNumber: 0,
                yourMonsterNumber: 0,
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
        let attacker = turn ? yourMonster : opponentMonster;
        let defender = turn ? opponentMonster : yourMonster;

        // Bônus somado ao ataque e defesa
        let attackChance = Math.floor(Math.random() * 6) + 4;
        let defenseChance = Math.floor(Math.random() * 6) + 4;
        let battleResult = (attacker.attack + attackChance) - (defender.defense + defenseChance);

        if (battleResult > 0) {
            defender.life -= battleResult;
            setBattleSituation(defender.name + ' sofreu ' + battleResult + ' de dano!')

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

        setTurn(!turn);
    }

    function useItem(item: string) {
        if (item === 'remedy' && yourItens.remedy > 0) {
            if (locationUrl.pathname === '/story-battle') {
                updateStoryValue({...storyValue, remedy: storyValue.remedy - 1});
            }

            yourItens.remedy --;
            yourMonster.life = yourMonster.id === 'inicial' ? 6 : 12; // Restaura a vida de acordo com o personagem
            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        } else if (item === 'maximumPower' && yourItens.maximumPower > 0){
            if (locationUrl.pathname === '/story-battle') {
                updateStoryValue({...storyValue, maximumPower: storyValue.maximumPower - 1});
            }

            yourItens.maximumPower --;
            yourMonster.attack += 3;
            setBattleSituation(yourMonster.name + ' ganhou + 3 de ataque!');
        } else {
            setBattleSituation('Você não possui mais esse item.');
        }

        setTurn(false); // Após uso do item, seu personagem fica na defensiva
    }

    function aftermath(attackerName: string) {
        // Modo história @todo rever modo história estar aqui
        if (locationUrl.pathname === '/story-battle') {
            let score = storyValue.score + 100 + (storyValue.remedy * 100) + (storyValue.maximumPower * 100) + (yourMonster.life * 10);

            if (opponentMonster.life <= 0 && opponentMonster.id !== 'boss1') { // Próxima história
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.callBattle === storyValue.opponentMonsterNumber) + 1,
                    opponentMonsterNumber: storyValue.opponentMonsterNumber + 1,
                    score: score
                });
            } else if (
                yourMonster.life <= 0 && opponentMonster.id === 'boss1' && yourMonster.id === 'inicial'
            ) { // Ultima chance
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'part5'),
                    yourMonsterNumber: 1
                });
            } else if (yourMonster.life <= 0) {
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'bad-ending'),
                    inGame: false
                });
            } else if (opponentMonster.life <= 0 && yourMonster.id === 'yourMonster1') {
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'good-ending'),
                    score: score,
                    inGame: false,
                });
            } else {
                updateStoryValue({
                    ...storyValue,
                    storyNumber: storyStorage.findIndex(x => x.id === 'secret-ending'),
                    score: score + 1000,
                    inGame: false,
                });
            }

            history.push('/story-mode');
            return;
        }

        // Modo treino
        if (opponentMonster.life <= 0) {
            setBattleSituation(attackerName + ' venceu!');
            if (opponentMonsterNumber !== 4) {
                setOpponentMonsterNumber(opponentMonsterNumber + 1);
            }

            setTurn(true);
        } else {
            setBattleSituation(attackerName + ' venceu! Fim de jogo.');
        }
    }

    return {
        gameMode,
        fighting,
        useItem,
        battleSituation,
        battleStatus,
        turn,
        yourItens,
        yourMonster,
        opponentMonster
    };
}