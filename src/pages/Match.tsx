import { useState } from "react";

import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

import Fighter from "../components/Fighter";

import FabIcon from '../utils/Fab';

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
    const innerHeight = window.innerHeight - 40;
    const [turn, setTurn] = useState(true);
    const [battleSituation, setBattleSituation] = useState(String);
    const [battleStatus, setBattleStatus] = useState(String);
    const [opponentMonsterNumber, setOpponentMonsterNumber] = useState(0);
    const [winner, setWinner] = useState(String);
    
    const [yourMonster] = useState<Monster>({
        name: yourMonsterStorage[0]['name'], 
        attack: 3, 
        attackChance: 0, 
        defense: 3, 
        defenseChance: 0, 
        life: 6, 
        monsterImg: yourMonsterStorage[0]['monsterImg'],
        remedy: 2,
        maximumPower: 2
    });
    const [opponentMonster] = useState<Monster>({
        name: opponentMonsterStorage[opponentMonsterNumber]['name'], 
        attack: 3, 
        attackChance: 0, 
        defense: 3, 
        defenseChance: 0, 
        life: 6, 
        monsterImg: opponentMonsterStorage[opponentMonsterNumber]['monsterImg']
    });

    function randomLuck() {
        return Math.floor(Math.random() * 6) + 1;
    };

    function fighting() {
        if (turn) {
            var attacker = yourMonster;
            var defender = opponentMonster;
        } else {
            var attacker = opponentMonster;
            var defender = yourMonster;
        }

        attacker.attackChance = randomLuck();
        defender.defenseChance = randomLuck();

        let result = (attacker.attack + attacker.attackChance) - (defender.defense + defender.defenseChance);

        if (result > 0) {
            defender.life -= result;
            setBattleSituation(defender.name + ' sofreu ' + result + ' de dano!')
        } else {
            setBattleSituation(defender.name + ' defendeu!')
        }

        setBattleStatus(
            attacker.name + ' usou ' + (attacker.attack + attacker.attackChance) + ' de ataque! ' +
            defender.name + ' usou ' + (defender.defense + defender.defenseChance) + ' de defesa!'
        )

        checkBattleSituation(attacker.name);
    }

    /** @todo Melhorar essa zona */
    function checkBattleSituation(attackerName: string) {
        if (winner !== '') { // Apaga informação do vencedor no início da batalha
            setWinner('');
        }

        if (yourMonster.life <= 0 && opponentMonsterNumber !== 4) { // Derrota antes da última luta, final ruim
            setWinner(attackerName + ' venceu! Fim de jogo.');
        }else if(opponentMonster.life <= 0 && opponentMonsterNumber <= 3){ // Vitória, próxima luta
            setWinner(attackerName + ' venceu!');
            setOpponentMonsterNumber(opponentMonsterNumber+1);
            setTurn(true);

            opponentMonster.name = opponentMonsterStorage[opponentMonsterNumber+1]['name'];
            opponentMonster.monsterImg = opponentMonsterStorage[opponentMonsterNumber+1]['monsterImg'];

            opponentMonster.life = 6; 
            yourMonster.life = 6;
            yourMonster.attack = 3;

            if (opponentMonsterNumber === 3) { // Vitória, luta final
                opponentMonster.life = 16; 
            }
        }else if(yourMonster.life <= 0){ // Derrota na última luta 
            setWinner(attackerName + ' venceu!');

            if (yourMonster.name === yourMonsterStorage[0]['name']) { // última chance na luta final
                yourMonster.name = yourMonsterStorage[1]['name'];
                yourMonster.monsterImg = yourMonsterStorage[1]['monsterImg'];
                yourMonster.attack = 6;
                yourMonster.life = 12;
            } else { // Derrota, final ruim
                setWinner(attackerName + ' venceu! Fim de jogo.');
            }
        }else if(opponentMonster.life <= 0 && opponentMonsterNumber === 4){ // Vitória final, fim de jogo
            if (yourMonster.name === yourMonsterStorage[1]['name']) { // Final bom
                setWinner(attackerName + ' venceu! Fim de jogo!');
            } else {
                setWinner(attackerName + ' venceu! Fim de jogo!'); // Final secreto
            }
        }else{
            setTurn(!turn); // Próximo turno da tabalha
        }
    }

    function useItem(item: string) {
        if (item === 'remedy' && yourMonster.remedy !== 0) {
            yourMonster.life = 6;
            yourMonster.remedy! -= 1; 

            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        }else if(item === 'maximumPower' && yourMonster.maximumPower !== 0){
            yourMonster.attack += 3;
            yourMonster.maximumPower! -= 1;

            setBattleSituation(yourMonster.name + ' ganhou + 3 de ataque!');
        }else{
            setBattleSituation('Você não possui mais esse item.');
        }

        setTurn(false);
    }

    return (
        <div
            style={{
                backgroundImage: "url(img/screens/battle.jpg)",
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
                    minHeight: innerHeight,
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
                                    {battleSituation}
                                    <br /><br />
                                    {winner}
                                    <br /><br />
                                </Typography>
                                <Typography variant="body2" align="center">
                                    Detalhes da batalha: <br />
                                    {battleStatus} <br />
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
            <FabIcon />
        </div>
    )
}