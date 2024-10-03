import { useAuth } from "../../../context/AuthContext/AuthContext";

export const Header: React.FC = () => {
  const { role, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <button className="text-2xl">&#9776;</button>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-darkBlue-dark">Ordernay</h1>
        <h2 className="text-sm font-semibold text-darkBlue-dark">
          {role === "administrador"
            ? "Administrador"
            : role === "mesero"
            ? "Mesero"
            : role === "bartender"
            ? "Bartender"
            : role === "cocinero"
            ? "Cocinero"
            : ""}
        </h2>
      </div>

      <button onClick={logout} className="text-2xl">
        &#9790;
      </button>
    </header>
  );
};
