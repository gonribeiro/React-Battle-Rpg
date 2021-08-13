import { useHistory, useLocation } from "react-router-dom";

import { useMatch } from "../hooks/useMatch";

import { Grid, Typography, Fab, Paper, CardActions } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';

import Monster from "../components/Monster";
import BackUrl from '../utils/BackUrl';

export default function Match() {
    const history = useHistory();
    const locationUrl = useLocation();
    const {
        fighting,
        item,
        continueGame,
        match,
        battleSituation,
        battleStatus,
        yourMonster,
        opponentMonster
    } = useMatch();

    return (
        <div
            style={{
                backgroundImage: "url(img/screens/background-battle3.jpg)",
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
                justifyContent="space-between"
                alignItems="center"
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Grid item xs={12} sm={3}>
                    <Monster monster={yourMonster} />
                    {opponentMonster.life > 0 && yourMonster.life > 0 &&
                        <CardActions>
                            <Fab
                                size="small"
                                color="primary"
                                variant="extended"
                                onClick={fighting}
                                style={{
                                    marginRight: "15px"
                                }}
                            >
                                {match.turn ? 'Ataque!' : 'Defenda!'}
                            </Fab>
                            <Fab
                                size="small"
                                color="primary"
                                variant="extended"
                                onClick={() => item('remedy')}
                                style={{
                                    marginRight: "15px"
                                }}
                            >
                                {match.remedy} <FavoriteBorderIcon fontSize="small"/>
                            </Fab>
                            <Fab
                                size="small"
                                color="primary"
                                variant="extended"
                                onClick={() => item('maximumPower')}
                            >
                                {match.maximumPower} <OfflineBoltOutlinedIcon fontSize="small"/>
                            </Fab>
                        </CardActions>
                    }
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper style={{padding: '10px'}}>
                        <Typography color="textSecondary" variant="h6" component="p" align="center">
                            {battleSituation} <br />
                        </Typography>
                        {yourMonster.life <= 0 && locationUrl.pathname !== '/story-battle' &&
                            <Typography variant="body2" align="center">
                                <br />
                                <Fab
                                    size="small"
                                    color="primary"
                                    variant="extended"
                                    onClick={() => history.go(0)}
                                >
                                    Tentar Novamente
                                    </Fab>
                                <br /><br />
                            </Typography>
                        }
                        { //@todo melhorar
                            ((opponentMonster.life <= 0 || yourMonster.life <= 0) && locationUrl.pathname === '/story-battle')
                            || (opponentMonster.life <= 0 && opponentMonster.id !== '5')
                        ?
                            <Typography variant="body2" align="center">
                                <br />
                                <Fab
                                    size="small"
                                    color="primary"
                                    variant="extended"
                                    onClick={continueGame}
                                >
                                    Continuar
                                </Fab>
                                <br /><br />
                            </Typography>
                        : <></>}
                        <Typography variant="body2" align="center">
                            {battleStatus} <br />
                            (Partida {opponentMonster.id} de 5)
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Monster monster={opponentMonster} />
                </Grid>
            </Grid>
            <BackUrl />
        </div>
    )
}