import React, { useEffect, useState } from "react";
import axios from "axios";
import TableItem from "././TableItem";


export const TableView = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <TableItem />
    </div>
  );
};

export default TableView;
