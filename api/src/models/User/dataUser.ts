import User from "./user.model";

export const initializeUsers = async () => {
  const users = [
    {
      username: "baizadiego",
      password: "diego",
      name: "Juan Diego",
      lastName: "Baiza Perdomo",
      roleID: 1,
    },
    {
      username: "olivadavid",
      password: "walter",
      name: "Walter David",
      lastName: "Oliva Franco",
      roleID: 2,
    },
    {
      username: "floresmayorin",
      password: "may",
      name: "Mayorin Estefani",
      lastName: "Flores Vasquez",
      roleID: 3,
    },
    {
      username: "reynosaeduardo",
      password: "guayo",
      name: "Edvin Eduardo",
      lastName: "Díaz Reynosa",
      roleID: 4,
    },
  ];

  for (const user of users) {
    await User.findOrCreate({
      where: { username: user.username },
      defaults: user,
    });
  }
};
