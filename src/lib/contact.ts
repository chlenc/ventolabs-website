import { parseLocaleFromPath } from "@/lib/i18n";
import { erpAgentContact, site } from "@/lib/site";

export function getContactForPath(pathname: string) {
  const { path } = parseLocaleFromPath(pathname);

  if (path === "/cases/erp-agent") {
    return {
      phone: erpAgentContact.phone,
      phoneDisplay: erpAgentContact.phoneDisplay,
      whatsapp: erpAgentContact.whatsapp,
    };
  }

  return {
    phone: site.phone,
    phoneDisplay: site.phoneDisplay,
    whatsapp: site.whatsapp,
  };
}
