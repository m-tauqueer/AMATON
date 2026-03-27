import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container page-block">
      <div className="empty-state">
        <h1>404</h1>
        <p>The page you requested could not be found.</p>
        <Link className="cta-link" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
