import "./header.css";
import { Link } from "react-router-dom";
import Home from "../../pages/Home";
export default function Header() {
  return (
    <header>
      <Link className="logo" to={<Home />}>
        Filmaria
      </Link>
      <Link className="favoritos" to={<Home />}>
        Salvos
      </Link>
    </header>
  );
}
