import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSaveStory } from '../hooks/useSaveStory';
import { useMatch } from '../hooks/useMatch';

import { Paper, Grid, Button, CardHeader, Avatar, Divider } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';

export default function Landing() {
    const { user } = useAuth();
    const { storyValue } = useSaveStory();
    const { gameMode } = useMatch();

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
                justifyContent="center"
                alignItems="center"
                style={{
                    margin: "auto",
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Paper className="paper">
                    {storyValue.inGame === false && storyValue.score > 0 &&
                        <>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={'Avatar de: ' + user?.name}
                                        src={user?.avatar}
                                    ></Avatar>
                                }
                                title="Campanha finalizada"
                                subheader={'com ' + storyValue.score + ' pontos'}
                            />
                            <Divider /><br />
                        </>
                    }
                    <Grid container spacing={2} justifyContent="center">
                        <Button
                            size="large"
                            color="primary"
                            onClick={() => gameMode('story-mode')}
                            disabled={storyValue.inGame ? false : true}
                        >
                            Continuar História
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Button
                            size="large"
                            color="primary"
                            onClick={() => gameMode('new-game')}
                        >
                            Modo História {!user ? '(Login)' : ''}
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Link to="/ranking">
                            <Button
                                size="large"
                                color="primary"
                            >
                                Classificação
                            </Button>
                        </Link>
                    </Grid>
                    {/* <Grid container spacing={2} justifyContent="center">
                        <Button
                            size="large"
                            color="primary"
                        >
                            Batalhar On-Line {!user ? '(Login)' : ''}
                        </Button>
                    </Grid> */}
                    <Grid container spacing={2} justifyContent="center">
                        <Button
                            size="large"
                            color="primary"
                            onClick={() => gameMode('treining')}
                        >
                            Treinar
                        </Button>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Link to="/howto">
                            <Button
                                size="large"
                                color="primary"
                            >
                                Mecânicas do Jogo
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Button
                            size="large"
                            color="primary"
                            href="https://github.com/gonribeiro/React-Battle-Rpg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon /> &nbsp; Github
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
