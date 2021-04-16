import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        minHeight: 335,
    },
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

const Monster: React.FC<MonsterProps> = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
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
                        {props.monster.attack} Poder de Ataque + Sorte <br />
                        {props.monster.defense} Poder de Defesa + Sorte
                    </Typography>
                </CardContent>
            </CardActionArea>
            { props.commandFighter && props.opponentMonsterLife !== 0 && props.monster.life !== 0 ? (
                <CardActions>
                    <div>
                        <Button 
                            size="small" 
                            color="primary" 
                            onClick={props.fight} 
                        >
                            {props.turn ? 'Ataque!' : 'Defenda!'}
                        </Button>
                        <Button 
                            size="small" 
                            color="primary" 
                            onClick={() => props.useItem('remedy')} 
                        >
                            Curar! ({props.monster.remedy} un)
                        </Button>
                        <br />
                        <Button 
                            size="small" 
                            color="primary" 
                            onClick={() => props.useItem('maximumPower')}
                        >
                            Aumentar Ataque! ({props.monster.maximumPower} un)
                        </Button>
                    </div>
                </CardActions>
            ) : (<div></div>)}
        </Card>
    )
}

export default Monster;