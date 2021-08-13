import { Link } from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Back() {
    return (
        <div className="fab" style={{margin: "10px"}}>
            <Link to="/">
                <Fab>
                    <ArrowBackIcon />
                </Fab>
            </Link>
        </div>
    )
}
