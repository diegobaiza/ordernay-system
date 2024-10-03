import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableProps } from "./TableInterface";

const TableItem: React.FC = () => {
  const [tables, setTables] = useState<TableProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get<TableProps[]>(
          "http://localhost:3300/api/tables"
        );
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (table: TableProps) => {
    if (!table.is_available) return; // No permitir seleccionar mesas ocupadas
    navigate(`/menu`, {
      state: { tableId: table.id, tableNumber: table.number }, // Enviamos el tableId y tableNumber correctamente
    });
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-xl font-bold mb-4">Seleccione la mesa</h1>

      <div className="grid grid-cols-3 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`cursor-pointer w-24 h-24 flex items-center justify-center rounded-full text-lg font-semibold ${
              table.is_available
                ? "text-black bg-green-palid hover:bg-green-700"
                : "text-white bg-red-500 cursor-not-allowed"
            }`}
            onClick={() => handleTableClick(table)}
            title={table.is_available ? "Disponible" : "Ocupada"}
          >
            {table.is_available ? `Mesa ${table.number}` : "Ocupada"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableItem;
