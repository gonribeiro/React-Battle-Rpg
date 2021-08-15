import { useState } from 'react';

import { makeStyles, 
    Paper,
    Grid,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BackUrl from '../utils/BackUrl';

const useStyles = makeStyles({
    text: {
        fontSize: 15,
        margin: 5
    },
});

export default function HowTo() {
    const [expandedAccordion, setExpandedAccordion] = useState(''); // Accordion
    const classes = useStyles();

    const openAccordion = (panel) => (event, isExpandedAccordion) => {
        setExpandedAccordion(isExpandedAccordion ? panel : false);
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Paper className="paper">
                    <Accordion expanded={expandedAccordion === 'about'} onChange={openAccordion('about')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography><strong>Sobre o Jogo</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className={classes.text}>
                                React Battle Rpg é um jogo de batalhas por turnos escrito em ReactJS. <br /><br />
                                Possui um modo história e um modo batalha, ambos com um número limitado de batalhas. <br />
                                O modo história possui três finais possíveis (bom, ruim e secreto).
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expandedAccordion === 'battles'} onChange={openAccordion('battles')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography><strong>Batalhas, Turnos e Caixas de exibição</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className={classes.text}>
                                O jogo possui três caixas de exibição. <br />
                                <li>A primeira exibe informações do seu personagem com botões de interação.</li>
                                <li>A segunda exibe informações da batalha (Se houve ou não danos, quanto cada personagem 
                                utilizou de poder de ataque e defesa, se algum item foi utilizado e quem venceu).</li>
                                <li>A terceira exibe informações do seu adversário.</li> <br />
                                <Grid container spacing={2} justifyContent="center">
                                    <img src="/img/howto/boxes.jpg" alt="Boxes" width="90%"/> 
                                </Grid>
                                <br />
                                Você sempre estará no comando dos turnos, efetuando uma ordem de ataque ou de defesa. <br />
                                Por turno, sempre haverá um monstro atacando e um defendendo. <br /><br />
                                <Grid container spacing={2} justifyContent="center">
                                    <img src="/img/howto/attack-defense.jpg" alt="AttackDefense" width="90%"/> 
                                </Grid>
                                <br />
                                Seu personagem e o seu adversário possuem três características básicas. <br />
                                <li><strong>HP:</strong> Vida total do personagem.</li>
                                <li><strong>Poder de Ataque + Sorte:</strong> Poder de ataque fixo do personagem + um número (entre 1 e 6)
                                aleatório de sorte.</li>
                                <li><strong>Poder de Defesa + Sorte:</strong> Poder de defesa fixo do personagem + um número (entre 1 e 6) aleatório de sorte.</li> <br />
                                <Grid container spacing={2} justifyContent="center">
                                    <img src="/img/howto/attributes.jpg" alt="Attributes"/> 
                                </Grid>
                                <br />
                                A "<strong>sorte</strong>" é determinada em cada turno para cada personagem na ação que ele está realizando. Exemplo:
                                <li>Seu personagem está atacando e possui 3 de poder de ataque. Neste turno sua sorte foi 5. Total: 8 de ataque.</li>
                                <li>Seu oponente está defendendo e possui 3 de poder de defesa. Neste turno sua sorte foi 2. Total: 5 de defesa.</li>
                                8 de ataque - 5 de defesa = 3 de dano. O defensor perde 3 de HP.
                                Se o defensor tiver uma defesa igual ou maior ao ataque do oponente, então não haverá danos em seu HP. <br /><br />
                                <Grid container spacing={2} justifyContent="center">
                                    <img src="/img/howto/battle-status.jpg" alt="BattleStatus" /> 
                                </Grid>
                                <br />
                                A mecânica se repete e vence quem zerar totalmente o HP do adversário primeiro. <br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expandedAccordion === 'item'} onChange={openAccordion('item')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography><strong>Itens</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className={classes.text}>
                                No início do jogo você possui quatro itens de dois tipos: <br />
                                <li>Duas unidades de Cura (quando utilizado, seu personagem tem a vida restaurada).</li>
                                <li>Duas unidades de Aumentar Ataque (quando utilizado, seu personagem recebe + 3 de ataque).</li> <br />
                                <Grid container spacing={2} justifyContent="center">
                                    <img src="/img/howto/itens.jpg" alt="Itens"/> 
                                </Grid>
                                <br />
                                Você pode usar esses itens livremente a qualquer momento do jogo. <br />
                                <strong>Atenção</strong>! Os atributos não são mantidos e os itens não são repostos para a próxima batalha, portanto, gerencie bem o seu estoque até a última partida.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expandedAccordion === 'score'} onChange={openAccordion('score')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography><strong>Pontuação do modo história</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Ao finalizar o modo história, você recebe uma pontuação de acordo com o seu desempenho.<br />
                                Como a pontuação é calculada? <br /><br />
                                Cada vitória lhe concede 100 pontos. <br />
                                + 100 pontos por cada item (remédio ou poder máximo) que estiver no seu estoque no final de cada confronto. <br />
                                + 10 pontos por cada ponto de vida que o seu personagem tiver no final de cada confronto. <br />
                                + 250 pontos no final do confronto caso o seu personagem esteja com a mesma quantidade de vida quando iniciou a batalha. <br />
                                Alcançando o final secreto, você receberá + 1000 (mil) pontos de bônus.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            </Grid>
            <BackUrl />
        </>
    );
}
