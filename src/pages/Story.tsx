import { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { Paper, Grid, Typography, Fab, CardMedia } from '@material-ui/core';
import FastForwardIcon from '@material-ui/icons/FastForward';

import BackUrl from '../utils/BackUrl';

import storyStorage from '../storage/Story';

export default function Story() {
    const history = useHistory();
    const [text, setText] = useState(String);
    const [numberLetter, setNumberLetter] = useState(0);
    const [storyNumber, setStoryNumber] = useState(
        String(Cookies.get('storyNumber')) !== 'undefined'
        ? Number(Cookies.get('storyNumber')) // Retorna onde história parou
        : 0 // Início da história
    );

    useEffect(() => {
        if (numberLetter < storyStorage[storyNumber]['text'].length) { // Escreve o texto pausadamente, letra por letra 
            setText(text + storyStorage[storyNumber]['text'].charAt(numberLetter)); // Adiciona a próxima letra ao texto
            setTimeout(() => {
                setNumberLetter(numberLetter + 1);
            }, 15)
        }
    }, [numberLetter]);

    /** @todo Melhorar essa zona */
    function advanceTheStory() {
        // Fim do jogo
        if(Boolean(storyStorage[storyNumber]['endingGame']) === true){
            Cookies.remove('opponentMonsterNumber');
            Cookies.remove('yourMonsterNumber');
            Cookies.remove('storyNumber');
            history.push('/');
            return;
        }
        
        if(String(storyStorage[storyNumber]['callBattle']) !== 'undefined'){ // Verifica se ato possui batalha
            if (storyNumber !== 35) { 
                Cookies.set('yourMonsterNumber', String(0)); // Segue luta
            } else {
                Cookies.set('yourMonsterNumber', String(1)); // Chance final para final bom
            }

            Cookies.set('opponentMonsterNumber', String(storyStorage[storyNumber]['callBattle'])); // Informa o número da batalha
            Cookies.set('storyNumber', String(storyNumber)); // Onde a história parou
            history.push('/story-battle');
        }else{ // Após final de cada ato, inicia uma batalha
            setText('');
            setNumberLetter(-1); // "-1" Elimina o primeiro caracter quando inicia o texto
            setStoryNumber(storyNumber + 1);
        }
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
                        <Fab size="small" variant="extended" onClick={advanceTheStory}>
                            <FastForwardIcon />
                        </Fab>
                    ) : (<div></div>)}
                </Grid>
            </Grid>
            <BackUrl />
        </Fragment>
    );
}
