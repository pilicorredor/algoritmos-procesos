import React from "react";
import "./colorsTableStyles.css";

const ColorsTable = ({ processes }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Proceso</th>
            <th>Estado del proceso</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((processes, index) => (
            <tr key={index}>
              <td>{processes.process_name}</td>
              <td style={{ display: "flex" }}>
                {processes.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    style={{
                      backgroundColor: color,
                      width: "20px",
                      height: "20px",
                      marginRight: "5px",
                    }}
                  ></div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorsTable;
