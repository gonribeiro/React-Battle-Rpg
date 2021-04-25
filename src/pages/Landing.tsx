import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { Paper, Grid, Button } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';

export default function Landing() {
    const history = useHistory();

    function newStoryMode() {
        Cookies.remove('opponentMonsterNumber');
        Cookies.remove('yourMonsterNumber');
        Cookies.remove('storyNumber');
        Cookies.set('remedy', String(2));
        Cookies.set('maximumPower', String(2));
        history.push('/story-mode');
        return;
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
                            onClick={newStoryMode}
                        >
                            Novo Modo História
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <Link to="/story-mode">
                            <Button
                                size="large" 
                                color="primary" 
                                disabled={
                                    // Havendo cookie, há opção de continuar
                                    String(Cookies.get('storyNumber')) !== 'undefined' ? false : true
                                } 
                            >
                                Continuar História
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <Link to="/battle-mode">
                            <Button
                                size="large" 
                                color="primary" 
                            >
                                Modo Batalha
                            </Button>
                        </Link>
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
                            href="https://github.com/gonribeiro/BattleMonsterReact" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="large" 
                                color="primary" 
                            >
                                <GitHubIcon />
                            </Button>
                        </a>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
