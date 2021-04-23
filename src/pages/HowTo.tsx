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

import FabIcon from '../utils/Fab';

const useStyles = makeStyles({
    text: {
        fontSize: 15,
        margin: 5
    },
});

export default function HowTo() {
    const innerHeight = window.innerHeight - 40;
    const [expandedAccordion, setExpandedAccordion] = useState(''); // Accordion
    const classes = useStyles();

    const openAccordion = (panel) => (event, isExpandedAccordion) => {
        setExpandedAccordion(isExpandedAccordion ? panel : false);
    };

    return (
        <div>
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    margin: 'auto', 
                    maxWidth: 840, 
                    minHeight: innerHeight, 
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
                                React Battle Monster é um jogo escrito em ReactJS de batalhas entre monstros por turnos. <br />
                                {/* O jogo possui um modo história com um número limitado de batalhas. São ao todo três finais possíveis. */}
                            </Typography>
                            {/* <Typography className={classes.text}>
                                <li>Final ruim: Derrota.</li>
                                <li>Final bom: Conseguiu todas as vitórias.</li>
                                <li>Final secreto.</li>
                            </Typography> */}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expandedAccordion === 'boxes'} onChange={openAccordion('boxes')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography><strong>Batalhas e Turnos</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className={classes.text}>
                                O jogo possui três caixas de exibição. <br />
                                <li>A primeira exibe informações do seu personagem com botões de interação.</li>
                                <li>A segunda exibe informações da batalha (Se houve ou não danos, quanto cada personagem 
                                utilizou de poder de ataque e defesa, se algum item foi utilizado e quem venceu).</li>
                                <li>A terceira exibe informações do seu adversário.</li> <br />
                                <Grid container spacing={2} justify="center">
                                    <img src="/img/howto/boxes.jpg" alt="Boxes" width="80%"/> 
                                </Grid>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expandedAccordion === 'battle'} onChange={openAccordion('battle')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography><strong>Caixas de exibição e Informações</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className={classes.text}>
                                Você sempre estará no comando dos turnos, efetuando uma ordem de ataque ou de defesa. <br /><br />
                                <Grid container spacing={2} justify="center">
                                    <img src="/img/howto/attack-defense.jpg" alt="AttackDefense" width="50%"/> 
                                </Grid>
                                <br />
                                Por turno, sempre haverá um monstro atacando e um defendendo. <br />
                                Seu personagem e o seu adversário possuem três características básicas. <br />
                                <li><strong>HP:</strong> Vida total do personagem.</li>
                                <li><strong>Poder de Ataque + Sorte:</strong> Poder de ataque fixo do personagem + um número (entre 1 e 6)
                                aleatório de sorte.</li>
                                <li><strong>Poder de Defesa + Sorte:</strong> Poder de defesa fixo do personagem + um número (entre 1 e 6) aleatório de sorte.</li> <br />
                                <Grid container spacing={2} justify="center">
                                    <img src="/img/howto/attributes.jpg" alt="Attributes" width="30%"/> 
                                </Grid>
                                <br />
                                A "<strong>sorte</strong>" é determinada em cada turno para cada personagem na ação que ele está realizando. Exemplo:
                                <li>Seu personagem está atacando e possui 3 de poder de ataque. Neste turno sua sorte foi 5. Total: 8 de ataque.</li>
                                <li>Seu oponente está defendendo e possui 3 de poder de defesa. Neste turno sua sorte foi 2. Total: 5 de defesa.</li>
                                8 de ataque - 5 de defesa = 3 de dano. O defensor perde 3 de HP.
                                Se o defensor tiver uma defesa igual ou maior ao ataque do oponente, então não haverá danos em seu HP. <br />
                                A mecânica se repete e vence quem zerar totalmente o HP do adversário primeiro. <br /><br />
                                <Grid container spacing={2} justify="center">
                                    <img src="/img/howto/battle-status.jpg" alt="BattleStatus" width="30%"/> 
                                </Grid>
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
                                <li>Duas unidades de Cura (quando utilizado, seu personagem fica com 6 de HP).</li>
                                <li>Duas unidades de Aumentar Ataque (quando utilizado, seu personagem recebe + 3 de ataque).</li> <br />
                                <Grid container spacing={2} justify="center">
                                    <img src="/img/howto/itens.jpg" alt="Itens" width="30%"/> 
                                </Grid>
                                <br />
                                Você pode usar esses itens livremente a qualquer momento do jogo. <br />
                                <strong>Atenção</strong>! Os atributos não são mantidos e os itens não são repostos para a próxima batalha, portanto, gerencie bem o seu estoque até a última partida.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            </Grid>
            <FabIcon />
        </div>
    );
}
