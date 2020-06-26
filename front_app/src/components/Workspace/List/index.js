import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';

import routesCode from 'routes/routesCode';
import { getWorkspaceUrl } from 'utils';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
}));

const List = ({ data = [], onDelete }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Subdomain</TableCell>
            <TableCell align="right">Actions</TableCell>
            {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={`${ row.name }_${ index }`}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.subDomain}</TableCell>
              <TableCell align="right">
                <Tooltip title='Delete' placement='top'>
                  <Fab
                    style={ { marginRight: 12 } }
                    color="secondary"
                    aria-label="delete"
                    size='small'
                    onClick={ () => onDelete(row.id) }
                  >
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title='Edit' placement='top'>
                  <Link to={ `${ routesCode.workspacesShow.replace(':id', row.id) }` }>
                    <Fab
                      style={ { marginRight: 12 } }
                      color="primary"
                      aria-label="edit"
                      size='small'
                    >
                      <EditIcon />
                    </Fab>
                  </Link>
                </Tooltip>
                <Tooltip title='Checkout' placement='top'>
                  <a
                    rel='noreferrer noopener'
                    href={ getWorkspaceUrl(row.subDomain) }
                    target='_blank'
                  >
                    <Fab color='primary' aria-label="go to workspace" size='small'>
                      <ExitToAppIcon />
                    </Fab>
                  </a>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
