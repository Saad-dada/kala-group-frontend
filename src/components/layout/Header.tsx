import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo.png";

type LeftNavItem = { label: string; href: string };
type RightNavItem = { label: string; href: string };

const leftNavItems: LeftNavItem[] = [
	{ label: "Projects", href: "/projects" },
	{ label: "Services", href: "/services" },
  { label: "Clientile", href: "/clients" },
];

const rightNavItems: RightNavItem[] = [
    { label: "Team", href: "/team" },
    { label: "About Us", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <nav className="primary-nav" aria-label="Primary navigation">
          {leftNavItems.map(({ href, label }) => (
            <Link key={href} className="nav-link" to={href}>
              {label}
            </Link>
          ))}
        </nav>
        
        <Link className="brand" to="/" aria-label="Kala Group home">
          <img src={logo} alt="Kala Group Logo" />
        </Link>

        <div className="right-area">
          <nav className="primary-nav" aria-label="Primary navigation">
            {rightNavItems.map(({ href, label }) => (
              <Link key={href} className="nav-link" to={href}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="btn btn-contact" to="/about">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          {leftNavItems.map(({ href, label }) => (
            <Link key={href} className="mobile-nav-link" to={href} onClick={closeMobileMenu}>
              {label}
            </Link>
          ))}
          {rightNavItems.map(({ href, label }) => (
            <Link key={href} className="mobile-nav-link" to={href} onClick={closeMobileMenu}>
              {label}
            </Link>
          ))}
          <Link className="btn btn-contact mobile-contact" to="/about" onClick={closeMobileMenu}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
