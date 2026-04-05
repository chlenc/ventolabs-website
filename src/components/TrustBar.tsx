import {
  siTelegram,
  siWhatsapp,
  siAnthropic,
  siGooglesheets,
  siN8n,
  siNotion,
  siMake,
  siCursor,
} from "simple-icons";

const logos = [
  { name: "Telegram", icon: siTelegram },
  { name: "WhatsApp", icon: siWhatsapp },
  { name: "Anthropic", icon: siAnthropic },
  { name: "Google Sheets", icon: siGooglesheets },
  { name: "n8n", icon: siN8n },
  { name: "Notion", icon: siNotion },
  { name: "Make", icon: siMake },
  { name: "Cursor", icon: siCursor },
];

function BrandIcon({ path }: { path: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

export function TrustBar() {
  const items = [...logos, ...logos];

  return (
    <section className="marquee">
      <div className="marquee__track">
        {items.map((logo, i) => (
          <div key={i} className="marquee__item">
            <span className="marquee__icon">
              <BrandIcon path={logo.icon.path} />
            </span>
            <span className="marquee__name">{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
