import React from 'react';
import './../../css/CommonTable.css';

// const CommonTable = props => {
//   const { headersName, children } = props;

//   return (
//     <table className="common-table">
//       <thead>
//         <tr className="common-table-row"> {/* Add class here */}
//           {
//             headersName.map((item, index) => {
//               return (
//                 // Use th for table headers
//                 <th className="common-table-header-column" key={index}>{ item }</th>
//               )
//             })
//           }
//         </tr>
//       </thead>
//       <tbody>
//       {console.log(children.map(child => child.props))}
// {React.Children.map(children, child => 
//   React.cloneElement(child, { className: "common-table-row" }) // Add class to each child
// )}
//       </tbody>
//     </table>
//   )
// }

const CommonTable = ({ headersName, data }) => {
  return (
    <table className="common-table">
      <thead>
        <tr className="common-table-row">
          {headersName.map((item, index) => (
            <th className="common-table-header-column" key={index}>{ item }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          // Add onClick handler to each row
          <tr className="common-table-row" key={rowIndex} onClick={row[row.length - 1]}>
            {row.slice(0, -1).map((cell, cellIndex) => (
              // Exclude the last element of row because it's a function
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;