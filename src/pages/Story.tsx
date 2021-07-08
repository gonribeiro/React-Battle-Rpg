import { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useStory } from '../hooks/useStory';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import { Paper, Grid, Typography, Fab, CardMedia } from '@material-ui/core';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import BackUrl from '../utils/BackUrl';

import storyStorage from '../storage/Stories';

export default function Story() {
    const history = useHistory();
    const { storyValue, updateStoryValue } = useStory();
    const { user, signInWithGoogle } = useAuth();

    const [text, setText] = useState(String);
    const [numberLetter, setNumberLetter] = useState(0);

    useEffect(() => {
        if (numberLetter < storyStorage[storyValue.storyNumber]['text'].length) { // Escreve o texto pausadamente
            setText(text + storyStorage[storyValue.storyNumber]['text'].charAt(numberLetter)); // Adiciona a próxima letra ao texto
            setTimeout(() => {
                setNumberLetter(numberLetter + 1);
            }, 70)
        }
    }, [numberLetter]);

    async function continueStory() {
        if (!user) {
            await signInWithGoogle();
        }

        if (storyStorage[storyValue.storyNumber]['endingGame']) {
            updateStoryValue({...storyValue, inGame: false });
            endGame();
        }
        
        if (String(storyStorage[storyValue.storyNumber]['callBattle']) !== 'undefined') {
            callBattle();
        } else { // Próximo trecho da história
            setText('');
            setNumberLetter(-1); // "-1" Elimina o primeiro caracter quando inicia o texto
            updateStoryValue({...storyValue, storyNumber: storyValue.storyNumber + 1});
        }
    }

    function callBattle() {
        // Se ultima batalha houve derrota, encerra jogo
        if (!storyValue.inGame) {
            endGame();
            return;
        }

        history.push('/story-battle');
    }

    async function endGame() {
        const rankingRef = database.ref(`ranking`);

        await rankingRef.push({
            id: user?.id,
            name: user?.name,
            avatar: user?.avatar,
            score: storyValue.score,
            date: Date()
        });

        history.push('/');
    }

    return (
        <Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                { storyStorage[storyValue.storyNumber]['textImg'] ? (
                    <div>
                        <Grid item xs={12}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={storyStorage[storyValue.storyNumber]['textImg']}
                            />
                        </Grid>
                    </div>
                ) : (<div></div>)}
                <Grid item xs={12}>
                    <Paper className="paper">
                        <Typography
                            style={{
                                fontSize: 15,
                                margin: 5
                            }}
                        >
                            { text }
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    { numberLetter === storyStorage[storyValue.storyNumber]['text'].length ? (
                        <Fab size="medium" color="primary" variant="extended" onClick={continueStory}>
                            Prosseguir <FastForwardIcon />
                        </Fab>
                    ) : (
                        <Fab size="medium" color="secondary" variant="extended" onClick={callBattle}>
                            Ignorar história <SkipNextIcon />
                        </Fab>
                    )}
                </Grid>
            </Grid>
            <BackUrl />
        </Fragment>
    );
}