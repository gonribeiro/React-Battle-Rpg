import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

import Fighter from "../components/Fighter";
import BackUrl from '../utils/BackUrl';

import { yourMonsterStorage, opponentMonsterStorage } from "../storage/Monsters";
import storyStorage from '../storage/Stories';

interface Monster {
    id: string;
    name: string;
    attack: number;
    attackChance: number;
    defense: number;
    defenseChance: number;
    life: number;
    monsterImg: string;
    remedy?: number;
    maximumPower?: number;
}

export default function Match() {
    const history = useHistory();
    const locationUrl = useLocation();
    const [turn, setTurn] = useState(true);
    const [battleSituation, setBattleSituation] = useState(String);
    const [battleStatus, setBattleStatus] = useState(String);

    const [yourMonster, setYourMonster] = useState<Monster>({
        ...yourMonsterStorage[
            locationUrl.pathname === '/story-battle'
            ? Number(Cookies.get('yourMonsterNumber')) // Modo história
            : 0 // Modo batalha
        ], 
        remedy: locationUrl.pathname === '/story-battle' ? Number(Cookies.get('remedy')) : 2, 
        maximumPower: locationUrl.pathname === '/story-battle' ? Number(Cookies.get('maximumPower')) : 2
    });

    const [opponentMonsterNumber, setOpponentMonsterNumber] = useState(
        locationUrl.pathname === '/story-battle'
        ? Number(Cookies.get('opponentMonsterNumber')) // Modo história
        : 0 // Modo batalha
    );
    const [opponentMonster, setOpponentMonster] = useState<Monster>(opponentMonsterStorage[opponentMonsterNumber]);

    useEffect(() => {
        setOpponentMonster(opponentMonsterStorage[opponentMonsterNumber]);
        setYourMonster({
            ...yourMonsterStorage[
                locationUrl.pathname === '/story-battle' ? Number(Cookies.get('yourMonsterNumber')) : 0
            ], // 0 é o monstrinho inicial do modo batalha
            remedy: yourMonster.remedy,
            maximumPower: yourMonster.maximumPower
        });
    }, [opponentMonsterNumber]);

    function fighting() {
        let attacker = turn ? yourMonster : opponentMonster;
        let defender = turn ? opponentMonster : yourMonster;

        attacker.attackChance = Math.floor(Math.random() * 6) + 1;
        defender.defenseChance = Math.floor(Math.random() * 6) + 1;

        let battleResult = (attacker.attack + attacker.attackChance) - (defender.defense + defender.defenseChance);

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
            attacker.name + ' usou ' + (attacker.attack + attacker.attackChance) + ' de ataque! ' +
            defender.name + ' usou ' + (defender.defense + defender.defenseChance) + ' de defesa!'
        )

        setTurn(!turn);
    }

    function useItem(item: string) {
        if (item === 'remedy' && yourMonster.remedy! > 0) {
            if (locationUrl.pathname === '/story-battle') {
                let remedy = Number(Cookies.get('remedy')) - 1;
                Cookies.set('remedy', String(remedy));
            } 

            yourMonster.remedy! --;
            yourMonster.life = 6;
            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        }else if(item === 'maximumPower' && yourMonster.maximumPower! > 0){
            if (locationUrl.pathname === '/story-battle') {
                let maximumPower = Number(Cookies.get('maximumPower')) - 1;
                Cookies.set('maximumPower', String(maximumPower));
            }
            
            yourMonster.maximumPower! --;
            yourMonster.attack += 3;
            setBattleSituation(yourMonster.name + ' ganhou + 3 de ataque!');
        }else{
            setBattleSituation('Você não possui mais esse item.');
        }

        setTurn(false); // Após uso do item, seu personagem fica na defensiva
    }

    /** @todo Melhorar isso */
    function afterBattle(attackerName: string) {
        // Modo história
        if (locationUrl.pathname === '/story-battle') { 
            if (opponentMonster.life <= 0 && opponentMonster.id !== 'boss1') { // Próxima história
                let nextStory = Number(Cookies.get('storyNumber')) + 1;
                Cookies.set('storyNumber', String(nextStory));
            }else if(yourMonster.life <= 0 && opponentMonster.id === 'boss1' && yourMonster.id === 'inicial') { // Ultima chance
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'part5')));
            }else if(yourMonster.life <= 0) {
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'bad-ending')));
            }else if(opponentMonster.life <= 0 && yourMonster.id === 'yourMonster1') {
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'good-ending')));
            }else{
                Cookies.set('storyNumber', String(storyStorage.findIndex(x => x.id === 'secret-ending')));
            }

            history.push('/story-mode');
            return;
        }

        // Modo batalha
        if (opponentMonster.life <= 0 && opponentMonster.id !== 'boss1') {
            setBattleSituation(attackerName + ' venceu!');
            setOpponentMonsterNumber(opponentMonsterNumber+1);
            setTurn(true);
        }else if(yourMonster.life <= 0 && opponentMonster.id === 'boss1' && yourMonster.id === 'inicial') {
            setYourMonster({
                ...yourMonsterStorage[1], // monstrinho final
                remedy: yourMonster.remedy,
                maximumPower: yourMonster.maximumPower
            });
        }else {
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