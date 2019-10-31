import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = variant => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a warning message!', { variant,anchorOrigin:{ vertical: 'bottom', horizontal: 'right'} });
    };

    return (
        <React.Fragment>
            <Button onClick={handleClick}>Show snackbar</Button>
            <Button onClick={handleClickVariant('warning')}>Show warning snackbar</Button>
        </React.Fragment>
    );
}

export default function Notifications() {
    return (
        <SnackbarProvider maxSnack={10}>
            <MyApp />
        </SnackbarProvider>
    );
}