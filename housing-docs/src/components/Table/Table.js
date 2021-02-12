import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function BasicTable(props) {
  const { headings, rows } = props;
  return (
      <>
      <br/>
    <TableContainer component={Paper}>
      <Table aria-label="simple table" style={{margin: 0, height: "100%"}}>
        <TableHead>
          <TableRow>
            <TableCell>{headings[0]}</TableCell>
            {headings.slice(1).map((heading, index) => (
              <TableCell key={index} align={props.align}>{heading}</TableCell>
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              {row.slice(1).map((rowValue, index) => (
                <TableCell key={index} align={props.align}>{rowValue}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    </>
  );
}

export default React.memo(BasicTable)