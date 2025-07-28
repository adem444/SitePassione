import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const links = [
  { name: "Conditions d'utilisation", href: "/conditions" },
  { name: 'Politique de confidentialité', href: '/confidentialite' },
];

const socials = [
  { name: 'Facebook', href: 'https://facebook.com/passione12', icon: <FaFacebookF size={28} /> },
  { name: 'Instagram', href: 'https://www.instagram.com/passione12__/', icon: <FaInstagram size={28} /> },
  { name: 'TikTok', href: 'https://tiktok.com/', icon: <FaTiktok size={28} /> },
  { name: 'YouTube', href: 'https://youtube.com/', icon: <FaYoutube size={28} /> }
];

const Footer = () => (
  <footer className="w-full bg-black border-t border-[#629F3F] text-white pt-10 pb-5 px-4 sm:px-8 mt-12 text-center" >
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
      {/* Left: Logo & Description */}
      <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
        <img
          src="/logo.png"
          alt="Logo Passione 12"
          className="w-50 sm:w-50 "
        />
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
          <strong className="text-[#629F3F]">TIKI TAKA TUNISIE</strong> est une expérience signée <strong className="text-[#629F3F]">PASSIONE 12</strong>,
          dédiée aux passionnés de football tunisien.
          <br />
          Ce n’est que le début… d’autres projets passionnants arrivent très bientôt !
        </p>
      </div>

      {/* Center: Contact & Socials */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="text-base font-semibold text-white"
          style={{ fontFamily: 'Gotham SSM, sans-serif' }}
        >
          Contact :{' '}
          <a
            href="mailto:contact@sitepassione.com"
            className="text-[#629F3F] hover:underline"
          >
            contact@sitepassione.com
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200 text-white"
              aria-label={social.name}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Right: Legal Links */}
      <div className="flex flex-col items-center md:items-end gap-2">
        <nav
          className="flex flex-col gap-2 text-sm font-semibold"
          aria-label="Footer legal navigation"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#629F3F] transition-colors duration-200"
              style={{ fontFamily: 'Gotham SSM, sans-serif' }}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-8 border-t border-[#2a2a2a] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-400 gap-2" style={{ fontFamily: 'Gotham SSM, sans-serif' }}>
      <span>&copy; {new Date().getFullYear()} <strong>PASSIONE 12</strong>. Tous droits réservés.</span>
      <span>Une passion. Plusieurs expériences. Reste connecté.</span>
    </div>
  </footer>
);

export default Footer;
