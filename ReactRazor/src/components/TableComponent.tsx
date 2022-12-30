import React from 'react';
import CSS, { Property } from "csstype";
import "./TableComponent.css";

export interface TableComponentProps {
  data: {
    [key: string]: any
  }[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {

  if (data != undefined && data.length > 0) {
    let headings = Object.keys(data[0]);
    return (
      <table className='tradeHist'>
        <thead>
          <tr>
            {
              headings.map(heading => <th>{heading}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map(item =>
              <tr>
                {
                  headings.map(heading => <td>{item[heading]}</td>)
                }
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
  else {
    return <div>No trades found.</div>
      ;
  }
}

export default TableComponent;
