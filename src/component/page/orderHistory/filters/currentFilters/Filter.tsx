import React from 'react';
import Typography from '@material-ui/core/Typography';

const Filter: React.FC<{ filter: string }>
= ({ filter }) => (<Typography variant='h6'>{filter + ': '}</Typography>);

export default Filter;