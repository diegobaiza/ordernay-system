import TableSite from "./tableSite.model";

export const initializeTables = async () => {
  const tables = [
    { number: 1, seats: 4, is_available: true },
    { number: 2, seats: 4, is_available: true },
    { number: 3, seats: 4, is_available: true },
    { number: 4, seats: 4, is_available: true },
    { number: 5, seats: 2, is_available: false },
    { number: 6, seats: 4, is_available: true },
    { number: 7, seats: 4, is_available: true },
    { number: 8, seats: 6, is_available: true },
    { number: 9, seats: 4, is_available: false },
    { number: 10, seats: 4, is_available: true },
    { number: 11, seats: 4, is_available: true },
    { number: 12, seats: 8, is_available: true },
    { number: 13, seats: 4, is_available: true },
    { number: 14, seats: 4, is_available: true },
    { number: 15, seats: 4, is_available: true },
  ];

  for (const table of tables) {
    await TableSite.findCreateFind({
      where: { number: table.number },
      defaults: table,
    });
  }
};
