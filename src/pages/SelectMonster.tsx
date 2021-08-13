import { useState } from 'react';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import { useMatch } from '../hooks/useMatch';

import Monster from "../components/Monster";
import ButtonSelectMonster from '../components/ButtonSelectMonster';
import BackUrl from '../utils/BackUrl';

import {
    Paper,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    Fab
} from '@material-ui/core';

import { yourMonsterStorage } from "../storage/Monsters";

export default function Options() {
    const [dontAskAgain, setDontAskAgain] = useState(false);
    const locationUrl = useLocation();
    const { gameMode, selectMonster, selectedMonster } = useMatch();

    function changeStateCheckbox() {
        setDontAskAgain(!dontAskAgain);

        Cookies.set('dontAskAgain', String(!dontAskAgain));
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    margin: 'auto',
                    maxWidth: 990,
                    minHeight: window.innerHeight - 40,
                }}
            >
                <Paper className="paper">
                    <Typography>
                        Escolha o personagem para os modos história e treino: <br />
                        { locationUrl.pathname === '/options' &&
                            <>*No modo história, o personagem estará disponível quando iniciar uma nova campanha.<br /></>
                        }
                        <br />
                    </Typography>
                    <Grid
                        container
                        justifyContent="space-between"
                    >
                        <Grid item xs={12} sm={4} onClick={() => selectMonster(0)}>
                            <Monster monster={yourMonsterStorage[0]} />
                            <ButtonSelectMonster
                                monsterNumber={0}
                                selected={selectedMonster}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} onClick={() => selectMonster(1)}>
                            <Monster monster={yourMonsterStorage[1]} />
                            <ButtonSelectMonster
                                monsterNumber={1}
                                selected={selectedMonster}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} onClick={() => selectMonster(2)}>
                            <Monster monster={yourMonsterStorage[2]} />
                            <ButtonSelectMonster
                                monsterNumber={2}
                                selected={selectedMonster}
                            />
                        </Grid>
                    </Grid>
                    { locationUrl.pathname === '/select-monster' &&
                        <>
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dontAskAgain}
                                        onChange={changeStateCheckbox}
                                        color="primary"
                                    />
                                }
                                label="Não perguntar novamente"
                            />
                            <br />
                            <Typography>
                                Você poderá alterar o personagem a qualquer momento acessando as opções.
                            </Typography>
                            <br />
                            <Fab
                                size="small"
                                color={'primary'}
                                variant="extended"
                                onClick={() => gameMode('new-game')}
                            >
                                Começar partida!
                            </Fab>
                        </>
                    }
                </Paper>
            </Grid>
            <BackUrl />
        </>
    );
}