import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { Paper, Grid, Button } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';

export default function Landing() {
    const history = useHistory();

    function storyMode(mode: String) {
        if (mode === 'new-game') { // Parâmetros para novo jogo do modo história
            Cookies.set('opponentMonsterNumber', String(0));
            Cookies.set('yourMonsterNumber', String(0));
            Cookies.set('storyNumber', String(0));
            Cookies.set('remedy', String(2));
            Cookies.set('maximumPower', String(2));
        }
        
        history.push('/story-mode');
    }

    return (
        <div
            style={{
                backgroundImage: "url(img/screens/background-landing.jpg)",
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
                    margin: "auto",
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Paper className="paper">
                    <Grid container spacing={2} justify="center">
                        <Button
                            size="large"
                            color="primary"
                            onClick={() => storyMode('continue')}
                            disabled={
                                // Havendo cookie, há opção de continuar história
                                String(Cookies.get('storyNumber')) !== 'undefined' ? false : true
                            }
                        >
                            Continuar
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <Button
                            size="large"
                            color="primary"
                            onClick={() => storyMode('new-game')}
                        >
                            Novo Jogo
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <a href="/battle-mode">
                            <Button
                                size="large"
                                color="primary"
                            >
                                Treinar
                            </Button>
                        </a>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <Link to="/howto">
                            <Button
                                size="large"
                                color="primary"
                            >
                                Mecânicas do Jogo
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <a 
                            href="https://github.com/gonribeiro/React-Battle-Rpg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="large"
                                color="primary"
                            >
                                <GitHubIcon /> &nbsp; Github
                            </Button>
                        </a>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
