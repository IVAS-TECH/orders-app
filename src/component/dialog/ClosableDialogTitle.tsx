import React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => ({
    dialogTitle: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute' as 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

export interface ClosableDialogTitleProps extends WithStyles<typeof styles> {
    children: string | React.ReactElement,
    onClose: () => void
};

const ClosableDialogTitle = withStyles(styles)(({
    classes,
    children,
    onClose
}: ClosableDialogTitleProps) => (
    <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h6">{children}</Typography>
        <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
        </IconButton>
    </DialogTitle>
));

export default ClosableDialogTitle;