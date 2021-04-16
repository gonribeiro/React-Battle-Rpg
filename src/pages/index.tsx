import { useState } from "react";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Monster from "../components/monster";

import monsterStorage from "../../storage/Monster";

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

export default function Home() {
    const [turn, setTurn] = useState(true);
    const [battleSituation, setBattleSituation] = useState(String);
    const [battleStatus, setBattleStatus] = useState(String);
    const [opponentMonsterNumber, setOpponentMonsterNumber] = useState(0);
    const [winner, setWinner] = useState(String);
    
    const [yourMonster] = useState<Monster>({
        name: monsterStorage['5']['name'], 
        attack: 3, 
        attackChance: 0, 
        defense: 3, 
        defenseChance: 0, 
        life: 6, 
        monsterImg: monsterStorage['5']['monsterImg'],
        remedy: 2,
        maximumPower: 2
    });
    const [opponentMonster] = useState<Monster>({
        name: monsterStorage[opponentMonsterNumber]['name'], 
        attack: 3, 
        attackChance: 0, 
        defense: 3, 
        defenseChance: 0, 
        life: 1, 
        monsterImg: monsterStorage[opponentMonsterNumber]['monsterImg']
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
        if (yourMonster.life <= 0 && opponentMonsterNumber !== 4) { // Derrota antes da última luta, final ruim
            setWinner(attackerName + ' venceu! Fim de jogo. Final ruim.');
        }else if(opponentMonster.life <= 0 && opponentMonsterNumber <= 4){ // Vitória, próxima luta
            setWinner(attackerName + ' venceu!');
            setOpponentMonsterNumber(opponentMonsterNumber+1);
            setTurn(true);

            opponentMonster.name = monsterStorage[opponentMonsterNumber+1]['name'];
            opponentMonster.monsterImg = monsterStorage[opponentMonsterNumber+1]['monsterImg'];

            opponentMonster.life = 1; 
            yourMonster.life = 6;
            yourMonster.attack = 3;

            if (opponentMonsterNumber === 3) { // Vitória, luta final
                opponentMonster.life = 16; 
            }
        }else if(yourMonster.life <= 0){ // Derrota na última luta 
            setWinner(attackerName + ' venceu!');

            if (yourMonster.name === monsterStorage['5']['name']) { // última chance na luta final
                yourMonster.name = monsterStorage['6']['name'];
                yourMonster.monsterImg = monsterStorage['6']['monsterImg'];
                yourMonster.attack = 6;
                yourMonster.life = 12;
            } else { // Derrota, final ruim
                setWinner(attackerName + ' venceu! Fim de jogo. Final ruim.');
            }
            
        }else if(opponentMonster.life <= 0 && opponentMonsterNumber === 4){ // Vitória final, fim de jogo
            if (yourMonster.name === monsterStorage['6']['name']) { // Final bom
                setWinner('Parabéns! Final bom!');
            } else {
                setWinner('Parabéns! Final Secreto!'); // Final secreto
            }
        }else{
            setTurn(!turn); // Próximo turno da tabalha
        }
    }

    function useItem(item: string) {
        if (item === 'remedy' && yourMonster.remedy !== 0) {
            yourMonster.life = 6;
            yourMonster.remedy -= 1; 

            setBattleSituation(yourMonster.name + ' restaurou a vida!');
        }else if(item === 'maximumPower' && yourMonster.maximumPower !== 0){
            yourMonster.attack += 3;
            yourMonster.maximumPower -= 1;

            setBattleSituation(yourMonster.name + ' ganhou + 3 de ataque!');
        }else{
            setBattleSituation('Você não possui mais esse item.');
        }

        setTurn(false);
    }

    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 990 }}>
            <Grid container justify="space-between">
                <Grid item xs={12} sm={3}>
                    <Monster 
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
                                <Typography gutterBottom variant="h4" component="h2" align="center">
                                    VS
                                </Typography>
                                <Typography color="textSecondary" variant="h6" component="p" align="center">
                                    <br />
                                    {battleSituation}
                                    <br /><br />
                                    {winner}
                                    <br /><br />
                                </Typography>
                                <Typography variant="body2" align="center">
                                    Detalhes da batalha: <br />
                                    {battleStatus}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Monster 
                        monster={opponentMonster}
                    />
                </Grid>
            </Grid>
        </div>
    )
}