import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Organization from './../../../type/Organization';
import TextContext from './../../../text/TextContext';

interface MembersProps {
    paperClass: string,
    titleClass: string,
    textToShowWhenNoDataClass: string,
    organization: null | Organization
}

const Memebers: React.FC<MembersProps> = ({
    paperClass,
    titleClass,
    textToShowWhenNoDataClass,
    organization
}) => (
    <Paper className={paperClass}>
        {<TextContext.Consumer>
            {text => (
                <>
                    <Typography variant='h5' className={titleClass}>
                        {text.organizationMembers(organization === null ? '' : organization.name)}
                    </Typography>
                    {organization === null ?
                        <Typography
                            variant='h6'
                            align='center'
                            color='textSecondary'
                            className={textToShowWhenNoDataClass}>
                            {text.noDataToShow}
                        </Typography> :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{text.form.field.userName}</TableCell>
                                    <TableCell>{text.form.field.email}</TableCell>
                                    <TableCell>{text.form.field.phone}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow selected>
                                    <TableCell>{organization.manager.name}</TableCell>
                                    <TableCell>{organization.manager.email}</TableCell>
                                    <TableCell>{organization.manager.phone}</TableCell>
                                </TableRow>
                                {organization.users.map(member => (
                                    <TableRow key={member.name}>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>{member.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </>
            )}
        </TextContext.Consumer>}
    </Paper>
);

export default Memebers;