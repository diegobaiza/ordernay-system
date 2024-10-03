import React from "react";

export interface SelectedTableProps {
  tableNumber: number;
}

const SelectedTable: React.FC<SelectedTableProps> = ({ tableNumber }) => {
  return (
    <div className="w-full text-center bg-blue-100 py-2 mt-4 mb-4">
      <span className="font-bold text-lg">Mesa: {tableNumber}</span>
    </div>
  );
};
export default SelectedTable;
