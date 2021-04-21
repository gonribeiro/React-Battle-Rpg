import { Link } from 'react-router-dom';

import { Paper, Grid, Button } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';

export default function Landing() {
    const innerHeight = window.innerHeight - 40;

    return (
        <div
            style={{
                backgroundImage: "url(img/screens/landing.jpg)",
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
                    minHeight: innerHeight, 
                }}
            >
                <Paper className="paper">
                    <Grid container spacing={2} justify="center">
                        <Button
                            size="large" 
                            color="primary" 
                            disabled
                        >
                            Modo História
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <Link to="/playing">
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
