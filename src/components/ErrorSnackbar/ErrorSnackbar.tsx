import * as React from 'react';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

export function CustomizedSnackbars() {

    const error = useSelector<AppRootStateType, AppRootStateType["app"]["error"]>(state => state.app.error)

    const dispatch = useAppDispatch()

    // const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC(null))
        // setOpen(false);
    };

    const isOpen = error !==null

    return (
        // <div>
        //     <Button onClick={handleClick}>Open Snackbar</Button>
        <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{horizontal:"left",vertical:"bottom"}}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}
            >
                {error}
            </Alert>
        </Snackbar>
        // </div>
    );
}