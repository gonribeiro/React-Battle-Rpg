import { Paper, Grid, Typography, Fab, CardMedia } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import BackUrl from '../utils/BackUrl';

import { useStory } from '../hooks/useStory';

export default function Story() {
    const {
        continueStory,
        callBattle,
        text,
        speedTextStory,
        speedText,
        numberLetter,
        storyStorage,
        storyValue
    } = useStory();

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
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
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Fab size="medium" variant="extended" onClick={speedTextStory}>
                        { speedText === false ? 'Acelerar' : 'Desacelerar' }
                    </Fab>
                    &nbsp;&nbsp;
                    { numberLetter === storyStorage[storyValue.storyNumber]['text'].length ? (
                        <Fab size="medium" color="primary" variant="extended" onClick={continueStory}>
                            Prosseguir <PlayArrowIcon />
                        </Fab>
                    ) : (
                        <Fab size="medium" color="secondary" variant="extended" onClick={callBattle}>
                            Pular história <SkipNextIcon />
                        </Fab>
                    )}
                </Grid>
            </Grid>
            <BackUrl />
        </>
    );
}