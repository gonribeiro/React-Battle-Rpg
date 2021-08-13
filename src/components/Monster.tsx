import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';

type MonsterProps = {
    monster: {
        id: string;
        name: string;
        attack: number;
        defense: number;
        life: number;
        monsterImg: string;
    };
}

const Monster: React.FC<MonsterProps> = (props) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    image={props.monster.monsterImg}
                    style={{
                        height: 140
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.monster.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.monster.life >= 0 ? props.monster.life : '0'} HP
                        • {props.monster.attack} Ataque
                        • {props.monster.defense} Defesa
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Monster;