import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

import Fighter from "../components/Fighter";
import BackUrl from '../utils/BackUrl';

import { yourMonsterStorage, opponentMonsterStorage } from "../storage/Monster";

interface Monster {
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
    const yourMonsterNumber = 
        locationUrl.pathname === '/story-battle'
        ? Number(Cookies.get('yourMonsterNumber')) // Modo história
        : 0 // Modo batalha
    ;
    const [opponentMonsterNumber, setOpponentMonsterNumber] = useState(
        locationUrl.pathname === '/story-battle'
        ? Number(Cookies.get('opponentMonsterNumber')) // Modo história
        : 0 // Modo batalha
    );
    const [yourMonster] = useState<Monster>({
        name: yourMonsterStorage[yourMonsterNumber]['name'], 
        attack: 3, 
        attackChance: 0, 
        defense: 3,
        defenseChance: 0, 
        life: yourMonsterStorage[yourMonsterNumber]['life'], 
        monsterImg: yourMonsterStorage[yourMonsterNumber]['monsterImg'],
        remedy: locationUrl.pathname === '/story-battle' ? Number(Cookies.get('remedy')) : 2,
        maximumPower: locationUrl.pathname === '/story-battle' ? Number(Cookies.get('maximumPower')) : 2
    });
    const [opponentMonster] = useState<Monster>({
        name: opponentMonsterStorage[opponentMonsterNumber]['name'], 
        attack: 3, 
        attackChance: 0, 
        defense: 3, 
        defenseChance: 0, 
        life: opponentMonsterStorage[opponentMonsterNumber]['life'], 
        monsterImg: opponentMonsterStorage[opponentMonsterNumber]['monsterImg']
    });

    function randomLuck() {
        return Math.floor(Math.random() * 6) + 1;
    };

    function fighting() {
        let attacker = turn ? yourMonster : opponentMonster;
        let defender = turn ? opponentMonster : yourMonster;

        attacker.attackChance = randomLuck();
        defender.defenseChance = randomLuck();

        let battleResult = (attacker.attack + attacker.attackChance) - (defender.defense + defender.defenseChance);

        if (battleResult > 0) {
            defender.life -= battleResult;
            setBattleSituation(defender.name + ' sofreu ' + battleResult + ' de dano!')

            if (defender.life <= 0) {
                prepareNextBattle(attacker.name);
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
        if (item === 'remedy' && (yourMonster.remedy! > 0 || Number(Cookies.get('remedy')) > 0)) {
            if (locationUrl.pathname === '/story-battle') {
                let remedy = Number(Cookies.get('remedy')) - 1;
                Cookies.set('remedy', String(remedy));
            } 

            yourMonster.remedy! --;
            yourMonster.life = 6;
            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        }else if(item === 'maximumPower' && (yourMonster.maximumPower! > 0 || Number(Cookies.get('maximumPower')) > 0)){
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

    /** @todo Melhorar essa zona */
    function prepareNextBattle(attackerName: string) {
        if (locationUrl.pathname === '/story-battle') { // Modo história
            if (opponentMonster.life <= 0 && opponentMonsterNumber !== 4) {
                let nextStory = Number(Cookies.get('storyNumber')) + 1;
                Cookies.set('storyNumber', String(nextStory));
            }else if(yourMonster.life <= 0 && yourMonsterNumber === 0 && opponentMonsterNumber === 4) {
                Cookies.set('storyNumber', String(30)); // Última chance
            }else if(yourMonster.life <= 0) {
                Cookies.set('storyNumber', String(36)); // Fim de jogo
            }else if(opponentMonster.life <= 0 && yourMonsterNumber === 1){
                Cookies.set('storyNumber', String(40)); // Final bom
            }else{ 
                Cookies.set('storyNumber', String(59)); // Final secreto
            }

            history.push('/story-mode');
            return;
        }

        if (yourMonster.life <= 0 && opponentMonsterNumber !== 4) { // Derrota antes da última luta, final ruim
            setBattleSituation(attackerName + ' venceu! Fim de jogo.');
        }else if(opponentMonster.life <= 0 && opponentMonsterNumber <= 3){ // Vitória, próxima luta
            setBattleSituation(attackerName + ' venceu!');
            setOpponentMonsterNumber(opponentMonsterNumber+1);
            setTurn(true);

            opponentMonster.name = opponentMonsterStorage[opponentMonsterNumber+1]['name'];
            opponentMonster.monsterImg = opponentMonsterStorage[opponentMonsterNumber+1]['monsterImg'];
            opponentMonster.life = opponentMonsterStorage[opponentMonsterNumber+1]['life']; 

            yourMonster.life = 6;
            yourMonster.attack = 3;
        }else if(yourMonster.life <= 0){ // Derrota na última luta 
            setBattleSituation(attackerName + ' venceu!');

            if (yourMonster.name === yourMonsterStorage[0]['name']) { // última chance na luta final
                yourMonster.name = yourMonsterStorage[1]['name'];
                yourMonster.monsterImg = yourMonsterStorage[1]['monsterImg'];
                yourMonster.life = yourMonsterStorage[1]['life'];
                yourMonster.attack = 3;
            } else { // Derrota, final ruim
                setBattleSituation(attackerName + ' venceu! Fim de jogo.');
            }
        }else{ // Vitória final, fim de jogo
            if (yourMonster.name === yourMonsterStorage[1]['name']) { // Final bom
                setBattleSituation(attackerName + ' venceu! Fim de jogo!');
            } else { // Final secreto
                setBattleSituation(attackerName + ' venceu! Fim de jogo!'); 
            }
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