export default function NotFound() {
  return (
    <main className="page page-not-found">
      <section className="page-header">
        <h1>Page Not Found</h1>
        <p>The page you’re looking for doesn’t exist.</p>
      </section>

      <section className="page-content">
        <div className="site-container">
          <p>
            Try the navigation above, or head back to the homepage.
          </p>
          <a className="btn btn-contact" href="/">Go Home</a>
        </div>
      </section>
    </main>
  );
}
