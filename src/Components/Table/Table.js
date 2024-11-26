// import React from "react";
import PropTypes from "prop-types";

function Table({ headers, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Validação de props com PropTypes
Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired, // Obrigatório, array de strings
  data: PropTypes.arrayOf(PropTypes.object).isRequired,    // Obrigatório, array de objetos
};

export default Table;
