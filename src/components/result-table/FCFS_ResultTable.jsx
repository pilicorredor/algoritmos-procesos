import React from "react";

const FCFSResultTable = ({ resultList }) => {
  const header_fields = [
    { nameField: 'Nombre Proceso' },
    { nameField: 'Tiempo ingreso'},
    { nameField: 'Tiempo ejecución'},
    { nameField: 'Tiempo de finalización' },
    { nameField: 'Tiempo de respuesta'},
    { nameField: 'Tiempo espera'},
  ];
  return (
    <div>
        <div className="inputBoxTitle">Tabla de resultados</div>
      {resultList.length > 0 && (
        <div>
          {/* Esta es la tabla de procesos */}
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                {header_fields.map((field, index) => (
                  <th key={index}>{field.nameField}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultList.map((process, index) => (
                <tr key={index}>
                  <td>{process.process_name}</td>
                  <td>{process.arrival_time}</td>
                  <td>{process.execution_time}</td>
                  <td>{process.turn_around_time}</td>
                  <td>{process.finish_time}</td>
                  <td>{process.waiting_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FCFSResultTable;
