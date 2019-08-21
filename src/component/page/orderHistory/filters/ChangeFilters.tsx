import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SetFilters from './setFilters/SetFilters';
import { connect } from 'react-redux';
import { closeChangeOrderFilter } from './../../../../store/changeOrderFilter';

interface ChangeFiltersProps {
    changeFilters: boolean,
    onCancel: () => void
}

const ChangeFilters: React.FC<ChangeFiltersProps> = ({
    changeFilters,
    onCancel
}) => (
    <Dialog open={changeFilters} onClose={onCancel} fullWidth maxWidth='md'>
        <DialogContent>
            <SetFilters />
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='default' size='large' onClick={onCancel}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
);

const ConnectedChangeFilters = connect(
    null,
    { onCancel: closeChangeOrderFilter }
)(ChangeFilters);

export default ConnectedChangeFilters;


