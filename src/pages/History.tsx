import { Fragment, useState, useEffect } from 'react';

import { makeStyles, Paper, Grid, Typography } from '@material-ui/core';

import FabIcon from '../utils/Fab';

import { Ato1 } from '../storage/History';

const useStyles = makeStyles({
    text: {
        fontSize: 15,
        margin: 5
    },
});

export default function History() {
    const [text, setText] = useState(String);
    const [numberLetter, setNumberLetter] = useState(0);
    const [historyNumber, setHistoryNumber] = useState(0);

    const innerHeight = window.innerHeight - 40;
    const classes = useStyles();

    useEffect(() => {
        // Escreve o texto pausadamente, letra por letra 
        if (numberLetter < Ato1[historyNumber]['text'].length) { 
            setText(text + Ato1[historyNumber]['text'].charAt(numberLetter)); // Adiciona a próxima letra ao texto
            setTimeout(() => {
                setNumberLetter(numberLetter + 1);
            }, 75)
        } else { // Próximo texto da história
            setTimeout(() => {
                setText('');
                setNumberLetter(-1); // "-1" Elimina o primeiro caracter quando passa o texto
                setHistoryNumber(historyNumber + 1);
            }, 1500)
        }
    }, [numberLetter, historyNumber]);

    return (
        <Fragment>
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    margin: 'auto', 
                    maxWidth: 990, 
                    minHeight: innerHeight, 
                }}
            >
                <Paper className="paper">
                    <Typography className={classes.text}>
                        { text }
                    </Typography>
                </Paper>
            </Grid>
            <FabIcon />
        </Fragment>
    );
}
