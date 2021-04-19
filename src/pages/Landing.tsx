import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function Landing() {
    const innerHeight = window.innerHeight - 40;

    return (
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
                    <Link to="/playing">
                        <Button
                            size="large" 
                            color="primary" 
                        >
                            Novo Jogo
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
                    <Link to="/credits">
                        <Button
                            size="large" 
                            color="primary" 
                        >
                            Créditos
                        </Button>
                    </Link>
                </Grid>
            </Paper>
        </Grid>
    );
}
