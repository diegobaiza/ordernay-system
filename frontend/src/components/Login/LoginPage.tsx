import { LogoSection } from "./LogoSection";
import LoginForm from "./LoginForm";

// Logo
import logo from "../../assets/ordernay_logo.png";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sección del logo */}
      <LogoSection logoUrl={logo} altText="Restaurant Logo" />

      {/* Sección del formulario */}
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
