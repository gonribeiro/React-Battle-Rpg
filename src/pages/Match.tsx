import { useHistory, Link } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";

import { Grid, Typography, Fab, Paper } from '@material-ui/core';

import Fighter from "../components/Fighter";
import BackUrl from '../utils/BackUrl';

export default function Match() {
    const history = useHistory();
    const {
        fighting,
        useItem,
        battleSituation,
        battleStatus,
        turn,
        yourItens,
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
                justify="space-between"
                alignItems="center"
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Grid item xs={12} sm={3}>
                    <Fighter
                        monster={yourMonster}
                        yourItens={yourItens}
                        commandFighter={true}
                        turn={turn}
                        opponentMonsterLife={opponentMonster.life}
                        fight={fighting}
                        useItem={useItem}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper style={{padding: '10px'}}>
                        <Typography color="textSecondary" variant="h6" component="p" align="center">
                            {battleSituation} <br />
                        </Typography>
                        {yourMonster.life <= 0 || opponentMonster.life <= 0 ? (
                            <>
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
                                    <Link to="/">
                                        <Fab
                                            size="small"
                                            color="secondary"
                                            variant="extended"
                                        >
                                            Encerrar
                                        </Fab>
                                    </Link>
                                    <br /><br />
                                </Typography>
                            </>
                        ) : (<></>)}
                        <Typography variant="body2" align="center">
                            {battleStatus}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Fighter
                        monster={opponentMonster}
                    />
                </Grid>
            </Grid>
            <BackUrl />
        </div>
    )
}