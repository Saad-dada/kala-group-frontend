import { useState } from "react";
import "../styles/header.css";
import logo from "../assets/logo.png";

type LeftNavItem = { label: string; href: string };
type RightNavItem = { label: string; href: string };

const leftNavItems: LeftNavItem[] = [
	{ label: "Projects", href: "#projects" },
	{ label: "Services", href: "#services" },
  { label: "Clientile", href: "#clientile" },
];

const rightNavItems: RightNavItem[] = [
    { label: "Team", href: "#team" },
    { label: "About Us", href: "#about" },
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
            <a key={href} className="nav-link" href={href}>
              {label}
            </a>
          ))}
        </nav>
        
        <a className="brand" href="/" aria-label="Kala Group home">
          <img src={logo} alt="Kala Group Logo" />
        </a>

        <div className="right-area">
          <nav className="primary-nav" aria-label="Primary navigation">
            {rightNavItems.map(({ href, label }) => (
              <a key={href} className="nav-link" href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="btn btn-contact" href="#contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          {leftNavItems.map(({ href, label }) => (
            <a key={href} className="mobile-nav-link" href={href} onClick={closeMobileMenu}>
              {label}
            </a>
          ))}
          {rightNavItems.map(({ href, label }) => (
            <a key={href} className="mobile-nav-link" href={href} onClick={closeMobileMenu}>
              {label}
            </a>
          ))}
          <a className="btn btn-contact mobile-contact" href="#contact" onClick={closeMobileMenu}>
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}