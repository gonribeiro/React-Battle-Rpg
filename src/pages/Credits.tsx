import { Fragment } from 'react';

import { Paper, Grid, Button} from '@material-ui/core';

import FabIcon from '../utils/Fab';

export default function Credits() {
    const innerHeight = window.innerHeight - 40;

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
                    <Grid container spacing={2} justify="center">
                        <a 
                            href="https://github.com/gonribeiro" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="large" 
                                color="primary" 
                            >
                                Desenvolvidor por: Tiago Ribeiro
                            </Button>
                        </a>
                    </Grid>
                    <br />
                    <Grid container spacing={2} justify="center">
                        <a 
                            href="https://github.com/gonribeiro/BattleMonsterReact" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="large" 
                                color="primary" 
                            >
                                Repositório do Jogo
                            </Button>
                        </a>
                    </Grid>
                </Paper>
            </Grid>
            <FabIcon />
        </Fragment>
    );
}
