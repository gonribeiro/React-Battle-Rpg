import { Paper, Grid, Typography, Fab, CardMedia } from '@material-ui/core';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import BackUrl from '../utils/BackUrl';

import { useStory } from '../hooks/useStory';

export default function Story() {
    const {
        continueStory,
        callBattle,
        text,
        numberLetter,
        storyStorage,
        storyValue
    } = useStory();

    return (
        <>
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
                { storyStorage[storyValue.storyNumber]['textImg'] ? (
                    <div>
                        <Grid item xs={12}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={storyStorage[storyValue.storyNumber]['textImg']}
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
                    { numberLetter === storyStorage[storyValue.storyNumber]['text'].length ? (
                        <Fab size="medium" color="primary" variant="extended" onClick={continueStory}>
                            Prosseguir <FastForwardIcon />
                        </Fab>
                    ) : (
                        <Fab size="medium" color="secondary" variant="extended" onClick={callBattle}>
                            Ignorar história <SkipNextIcon />
                        </Fab>
                    )}
                </Grid>
            </Grid>
            <BackUrl />
        </>
    );
}