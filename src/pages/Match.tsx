import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

import Fighter from "../components/Fighter";
import BackUrl from '../utils/BackUrl';

import { yourMonsterStorage, opponentMonsterStorage } from "../storage/Monsters";
import storyStorage from '../storage/Stories';

type Monster = {
    id: string;
    name: string;
    attack: number;
    defense: number;
    life: number;
    monsterImg: string;
}

type Itens = {
    remedy: number;
    maximumPower: number;
}

export default function Match() {
    const history = useHistory();
    const locationUrl = window.location.pathname;
    const [turn, setTurn] = useState(true);
    const [battleSituation, setBattleSituation] = useState(String);
    const [battleStatus, setBattleStatus] = useState(String);
    const [yourItens, setYourItens] = useState<Itens>({remedy: 2, maximumPower: 2});
    const [yourMonster, setYourMonster] = useState<Monster>({...yourMonsterStorage[0]});
    const [opponentMonster, setOpponentMonster] = useState<Monster>({...opponentMonsterStorage[0]});
    const [opponentMonsterNumber, setOpponentMonsterNumber] = useState(0);

    // Recarrega atributos do seu personagem e carrega próximo oponente no modo treino
    useEffect(() => {
        setOpponentMonster({...opponentMonsterStorage[opponentMonsterNumber]});
        setYourMonster({...yourMonsterStorage[0]});
    }, [opponentMonsterNumber]);

    useEffect(() => {
        if (locationUrl === '/story-battle') {
            setOpponentMonster({...opponentMonsterStorage[Number(Cookies.get('opponentMonsterNumber'))]});
            setYourMonster({...yourMonsterStorage[Number(Cookies.get('yourMonsterNumber'))]});
            setYourItens({
                remedy: Number(Cookies.get('remedy')),
                maximumPower: Number(Cookies.get('maximumPower'))
            })
        }
    }, []);

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
                afterBattle(attacker.name);
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
            if (locationUrl === '/story-battle') {
                Cookies.set('remedy', String(Number(Cookies.get('remedy')) - 1));
            }

            yourItens.remedy --;
            yourMonster.life = yourMonster.id === 'inicial' ? 6 : 12; // Restaura a vida de acordo com o personagem
            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        } else if (item === 'maximumPower' && yourItens.maximumPower > 0){
            if (locationUrl === '/story-battle') {
                Cookies.set('maximumPower', String(Number(Cookies.get('maximumPower')) - 1));
            }

            yourItens.maximumPower --;
            yourMonster.attack += 3;
            setBattleSituation(yourMonster.name + ' ganhou + 3 de ataque!');
        } else {
            setBattleSituation('Você não possui mais esse item.');
        }

        setTurn(false); // Após uso do item, seu personagem fica na defensiva
    }

    /** @todo Rever implementação */
    function afterBattle(attackerName: string) {
        // Modo história
        if (locationUrl === '/story-battle') { 
            if (opponentMonster.life <= 0 && opponentMonster.id !== 'boss1') { // Próxima história
                let nextStory = storyStorage.findIndex(x => x.callBattle === Number(Cookies.get('opponentMonsterNumber'))) + 1;
                Cookies.set('storyNumber', String(nextStory));

                let nextBattle = Number(Cookies.get('opponentMonsterNumber')) + 1;
                Cookies.set('opponentMonsterNumber', String(nextBattle));
            } else if (yourMonster.life <= 0 && opponentMonster.id === 'boss1' && yourMonster.id === 'inicial') { // Ultima chance
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'part5')));

                Cookies.set('yourMonsterNumber', String(1));
            } else if (yourMonster.life <= 0) {
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'bad-ending')));
                Cookies.remove('yourMonsterNumber');
            } else if (opponentMonster.life <= 0 && yourMonster.id === 'yourMonster1') {
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'good-ending')));
                Cookies.remove('yourMonsterNumber');
            } else {
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'secret-ending')));
                Cookies.remove('yourMonsterNumber');
            }

            history.push('/story-mode');
            return;
        }

        // Modo batalha
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

    return (
        <div
            style={{
                backgroundImage: "url(img/screens/background-battle3.jpg)",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: "97vh",
                width: "100%",
            }}
        >
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Grid item xs={12} sm={3}>
                    <Fighter
                        monster={yourMonster}
                        yourItens={yourItens}
                        commandFighter={true}
                        turn={turn}
                        opponentMonsterLife={opponentMonster.life}
                        fight={fighting}
                        useItem={useItem}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography color="textSecondary" variant="h6" component="p" align="center">
                                    {battleSituation} <br /><br />
                                </Typography>
                                <Typography variant="body2" align="center">
                                    {battleStatus}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Fighter
                        monster={opponentMonster}
                    />
                </Grid>
            </Grid>
            <BackUrl />
        </div>
    )
}