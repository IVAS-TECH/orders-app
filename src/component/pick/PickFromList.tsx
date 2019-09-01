import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from './../formControl/Checkbox';

export type ListPick<Key extends string> = {
    [K in Key]: boolean
};

export interface PickFromListProps<Key extends string> {
    listPick: ListPick<Key>,
    order?: Array<Key>,
    text?: Record<Key, string>,
    onToggleFromList: (key: Key) => void
};

export default function PickFromList<Key extends string>({
    listPick,
    order,
    text,
    onToggleFromList
}: PickFromListProps<Key>) {
    return (
        <List>
            {(order
                ? order
                : (Object.keys(listPick) as Array<Key>).sort()
            ).map((key, index) => (
                <ListItem key={`${key}@${index}`}>
                    <ListItemText primary={text ? text[key] : key} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            edge='end'
                            onToggle={() => onToggleFromList(key)}
                            checked={listPick[key]} />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};