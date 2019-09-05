import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ClosableDialogTitle from './../../../dialog/ClosableDialogTitle';
import SetFilters from './setFilters/SetFilters';
import { connect } from 'react-redux';
import { closeChangeOrderFilter } from './../../../../store/changeOrderFilter';
import TextContext from './../../../../text/TextContext';

interface ChangeFiltersProps {
    changeFilters: boolean,
    onCancel: () => void
}

const ChangeFilters: React.FC<ChangeFiltersProps> = ({
    changeFilters,
    onCancel
}) => (
    <TextContext.Consumer>
        {text => (
            <Dialog
                open={changeFilters}
                onClose={onCancel}
                fullWidth
                maxWidth='md'
                scroll='paper' >
                <ClosableDialogTitle onClose={onCancel}>
                    {text.action.changeFilters}
                </ClosableDialogTitle>
                <DialogContent dividers>
                    <SetFilters />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='default'
                        size='large'
                        onClick={onCancel}>
                        {text.action.cancel}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);

const ConnectedChangeFilters = connect(
    null,
    { onCancel: closeChangeOrderFilter }
)(ChangeFilters);

export default ConnectedChangeFilters;


