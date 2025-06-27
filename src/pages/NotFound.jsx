import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Pagina Non Trovata</h1>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/" className="back-home">
        Torna alla Home
      </Link>
    </div>
  );
}

export default NotFound;
