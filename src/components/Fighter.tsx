import { 
    makeStyles,
    Card, 
    CardActionArea, 
    CardContent, 
    CardMedia, 
    Typography, 
    CardActions, 
    Tooltip,
    Fab
} from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

interface MonsterProps {
    monster: {
        name: string;
        attack: number;
        attackChance: number;
        defense: number;
        defenseChance: number;
        life: number;
        monsterImg: string;
        remedy?: number;
        maximumPower?: number;
    };
    commandFighter?: boolean;
    turn?: boolean;
    fight?: any;
    useItem?: any;
    opponentMonsterLife?: number;
}

const Fighter: React.FC<MonsterProps> = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.monster.monsterImg}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.monster.name}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {props.monster.life >= 0 ? props.monster.life : '0'} HP
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.monster.attack} Ataque / {props.monster.defense} Defesa
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            { props.commandFighter && props.opponentMonsterLife! > 0 && props.monster.life > 0 ? (
                <CardActions >
                    <Fab 
                        size="small" 
                        color="primary" 
                        variant="extended" 
                        onClick={props.fight}
                    >
                        {props.turn ? 'Ataque!' : 'Defenda!'}
                    </Fab>
                    <Tooltip title="CURA!" placement="top">
                        <Fab 
                            size="small" 
                            color="primary" 
                            variant="extended" 
                            onClick={() => props.useItem('remedy')} 
                        >
                            {props.monster.remedy} <FavoriteBorderIcon fontSize="small"/>  
                        </Fab>
                    </Tooltip>
                    <Tooltip title="AUMENTAR ATAQUE!" placement="top">
                        <Fab 
                            size="small" 
                            color="primary" 
                            variant="extended" 
                            onClick={() => props.useItem('maximumPower')}
                        >
                            {props.monster.maximumPower} <OfflineBoltOutlinedIcon fontSize="small"/> 
                        </Fab>
                    </Tooltip>
                </CardActions>
            ) : (<div></div>)}
        </div>
    )
}

export default Fighter;