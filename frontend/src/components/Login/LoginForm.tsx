import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, role } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });

      // Verificar que el role esté definido antes de redirigir
      if (role) {
        navigate(`/${role}-dashboard`); // Redirige según el rol
      }
    } catch (error: any) {
      toast.error(error.message || "Error en el inicio de sesión");
    }
  };

  // Nueva lógica de redirección basada en el cambio de `role`
  useEffect(() => {
    console.log("Role in useEffect:", role);
    if (role) {
      navigate(`/${role.toLowerCase()}-dashboard`);
    }
  }, [role, navigate]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      {/* Título "¿Qué tal?" centrado */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        ¿Qué tal?
      </h2>

      <FormInput
        label="Usuario"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="mb-4 relative">
        <FormInput
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Botón para mostrar/ocultar contraseña */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      <div className="flex justify-center">
        <SubmitButton label="Ingresar" isLoading={isLoading} />
      </div>
    </form>
  );
};

const FormInput = ({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
    />
  </div>
);

const SubmitButton = ({
  label,
  isLoading,
}: {
  label: string;
  isLoading: boolean;
}) => (
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    disabled={isLoading}
  >
    {isLoading ? "Cargando..." : label}
  </button>
);

export default LoginForm;
