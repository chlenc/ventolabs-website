import { LogoMark } from "./Logo";
import { site, footer } from "@/lib/content";
import { href } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-name">
              <LogoMark />
              <span>{site.name}</span>
            </div>
            <p>{footer.blurb}</p>
            <div className="footer__socials">
              <a href={`mailto:${site.email}`} title="Email" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
                </svg>
              </a>
              <a href={site.whatsapp} title="WhatsApp" aria-label="WhatsApp" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.47 14.38c-.29-.15-1.71-.84-1.97-.94-.27-.1-.46-.15-.65.15-.2.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.19.05-.36-.02-.51-.07-.14-.65-1.56-.89-2.14-.23-.56-.47-.49-.65-.49h-.56c-.19 0-.51.07-.77.36-.27.29-1.02 1-1.02 2.43s1.04 2.82 1.19 3.01c.14.19 2.05 3.13 4.97 4.39.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.38.24-.67.24-1.25.17-1.37-.07-.12-.27-.19-.56-.34M12.05 21.8h-.02c-1.78 0-3.53-.48-5.05-1.38l-.36-.22-3.76.99 1-3.67-.24-.37A9.86 9.86 0 012.05 12c0-5.5 4.48-9.98 9.99-9.98 2.67 0 5.18 1.04 7.06 2.93a9.93 9.93 0 012.93 7.07c0 5.5-4.48 9.99-9.98 9.99"/>
                </svg>
              </a>
              <a href={site.telegram} title="Telegram" aria-label="Telegram" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6.54l-2.04 9.6c-.15.68-.56.84-1.13.52l-3.13-2.31-1.51 1.45c-.17.17-.31.31-.64.31l.22-3.18 5.78-5.22c.25-.22-.05-.35-.39-.13l-7.14 4.49-3.07-.96c-.67-.21-.68-.67.14-.99l12-4.63c.56-.2 1.04.14.86.99l.05-.04z"/>
                </svg>
              </a>
              <a href={site.linkedin} title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11-.01-4.13 2.06 2.06 0 01.01 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>Services</h4>
              {footer.services.map((link) => (
                <a key={link.href} href={href(link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              {footer.company.map((link) => (
                <a key={link.href} href={href(link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="footer__col">
              <h4>Contact</h4>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.whatsapp} target="_blank" rel="noopener">{site.phoneDisplay}</a>
              <a href={site.telegram} target="_blank" rel="noopener">Telegram {site.telegramHandle}</a>
              <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {year} {site.name}. All rights reserved.</span>
          <div className="footer__legal">
            <a href={href("/terms")}>Terms</a>
            <a href={href("/privacy")}>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
