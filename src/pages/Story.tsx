import { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { Paper, Grid, Typography, Fab, CardMedia } from '@material-ui/core';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import BackUrl from '../utils/BackUrl';

import storyStorage from '../storage/Stories';

export default function Story() {
    const history = useHistory();
    const [text, setText] = useState(String);
    const [numberLetter, setNumberLetter] = useState(0);
    const [storyNumber, setStoryNumber] = useState(Number(Cookies.get('storyNumber')));

    useEffect(() => {
        if (numberLetter < storyStorage[storyNumber]['text'].length) { // Escreve o texto pausadamente
            setText(text + storyStorage[storyNumber]['text'].charAt(numberLetter)); // Adiciona a próxima letra ao texto
            setTimeout(() => {
                setNumberLetter(numberLetter + 1);
            }, 45)
        }
    }, [numberLetter]);

    function continueStory() {
        if (Boolean(storyStorage[storyNumber]['endingGame']) === true) {
            endGame();
        }
        
        if (String(storyStorage[storyNumber]['callBattle']) !== 'undefined') {
            callBattle();
        } else { // Próximo trecho da história
            setText('');
            setNumberLetter(-1); // "-1" Elimina o primeiro caracter quando inicia o texto
            setStoryNumber(storyNumber + 1);
        }
    }

    function callBattle() {
        if (String(Cookies.get('yourMonsterNumber')) === 'undefined') { // Se ultima batalha houve derrota, encerra jogo
            endGame();
            return;
        }

        window.location.href = '/story-battle';
    }

    function endGame() {
        Cookies.remove('storyNumber');
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
                { storyStorage[storyNumber]['textImg'] ? (
                    <div>
                        <Grid item xs={12}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={storyStorage[storyNumber]['textImg']}
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
                    { numberLetter === storyStorage[storyNumber]['text'].length ? (
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