import { CardActions, Fab } from '@material-ui/core';

type buttonProps = {
    monsterNumber: number;
    selected: number;
}

const ButtonSelectMonster: React.FC<buttonProps> = (props) => {
    return (
        <CardActions>
            <Fab size="small" color={props.monsterNumber === props.selected ? 'primary' : 'inherit'} variant="extended">
                {props.monsterNumber === props.selected ? 'Salvo!' : 'Escolho você!'}
            </Fab>
        </CardActions>
    )
}

export default ButtonSelectMonster;