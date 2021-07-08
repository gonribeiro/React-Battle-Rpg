import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { useStory } from '../hooks/useStory';

import {
    Paper,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BackUrl from '../utils/BackUrl';

type FirebaseRanking = Record<string, {
    name: string,
    avatar: string,
    score: string
}>

type RankingType = {
    id: string,
    name: string,
    avatar: string,
    score: string
}

export default function Ranking() {
    const [ranking, setRanking] = useState<RankingType[]>([]);
    const { storyValue } = useStory();
    // Accordion
    const [expandedAccordion, setExpandedAccordion] = useState('');
    const openAccordion = (panel) => (event, isExpandedAccordion) => {
        setExpandedAccordion(isExpandedAccordion ? panel : false);
    };

    useEffect(() => {
        const rankingRef = database.ref(`ranking`);

        rankingRef.on('value', ranking => {
            const databaseRanking = ranking.val();
            const firebaseRanking: FirebaseRanking = databaseRanking ?? {};

            const parsedRanking = Object.entries(firebaseRanking).map(([key, value]) => {
                return {
                    id: key,
                    name: value.name,
                    avatar: value.avatar,
                    score: value.score,
                }
            });

            setRanking(parsedRanking.sort((a, b) => parseFloat(b.score) - parseFloat(a.score))); // ordenando
        });

        return () => {
            rankingRef.off('value')
        }
    }, []);

    return (
        <div
            style={{
                backgroundImage: "url(img/screens/background-battle5.jpg)",
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
                justify="center"
                alignItems="center"
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Paper className="paper">
                    <Typography variant="h6">
                        { // @todo refazer isso
                            storyValue.inGame === false && storyValue.score > 0 ? (
                            <div style={{display: 'flex',  justifyContent:'center', margin: '20px'}}>
                               Você terminou sua última campanha com {storyValue.score} pontos.
                            </div>
                        ) : (<></>)}
                    </Typography>
                    <Accordion expanded={expandedAccordion === 'about'} onChange={openAccordion('about')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography><strong>Classificação geral do modo história</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Ao finalizar o modo história, você recebe uma pontuação de acordo com o seu desempenho.<br />
                                Como a pontuação é calculada? <br /><br />
                                Cada vitória lhe concede 100 pontos. <br />
                                + 100 pontos por cada item (remédio ou poder máximo) que estiver no seu estoque. <br />
                                + 10 pontos por cada ponto de vida que o seu personagem tiver no final do confronto. <br />
                                Alcançando o final secreto, você receberá +1000 (mil) pontos de bônus.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {ranking?.map(ranking => {
                        return <List key={ranking.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={'Avatar de: ' + ranking.name}
                                        src={ranking.avatar}
                                    >
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ranking.name}
                                    secondary={ranking.score + ' pontos'}
                                />
                            </ListItem>
                        </List>
                    })}
                </Paper>
            </Grid>
            <BackUrl />
        </div>
    )
}