import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Vento Labs — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="legal">
      <div className="container container--narrow">
        <h1>Privacy Policy</h1>
        <p>Last updated: April 2026</p>
        <p>
          This policy applies to Vento Labs Pte. Ltd. (UEN 202504485G), a company
          incorporated in the Republic of Singapore.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>Contact information (name, email, company) when you book a call or fill out a form</li>
          <li>Business information shared during consultations and implementation</li>
          <li>Communication records (emails, call notes) related to our services</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>Website usage data (pages visited, time on site) via analytics</li>
          <li>Device and browser information for website optimization</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our AI automation services</li>
          <li>To communicate about your project and our services</li>
          <li>To schedule and conduct discovery calls</li>
          <li>To analyze website usage and improve user experience</li>
        </ul>
        <p>
          We do not sell, rent, or share your personal information with third parties for
          marketing purposes.
        </p>

        <h2>3. AI Model Provider Data Policies</h2>
        <p>
          When we implement AI solutions for your business, we use third-party AI model
          providers (such as OpenAI and Anthropic) via their business/API tiers. Key points:
        </p>
        <ul>
          <li>
            Business and API-tier usage: your data is not used to train AI models by default
          </li>
          <li>
            Data is processed for the purpose of generating responses only and is subject to
            the provider&apos;s data retention policies
          </li>
          <li>
            We use API-level access with appropriate data handling agreements in place
          </li>
          <li>
            For clients with strict data requirements, we can implement self-hosted or
            on-premise AI models
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including:
        </p>
        <ul>
          <li>Encrypted communications (TLS/SSL)</li>
          <li>Role-based access controls for all systems</li>
          <li>Regular security reviews of our processes and tools</li>
          <li>Minimal data retention — we only keep what&apos;s necessary for service delivery</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information only as long as necessary to provide our
          services and fulfill legal obligations. Project data is retained for the duration
          of our engagement plus 90 days for knowledge transfer. You may request deletion of
          your data at any time.
        </p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Opt out of marketing communications</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>

        <h2>7. Cookies and Tracking</h2>
        <p>
          Our website uses minimal cookies for essential functionality. We use privacy-
          focused analytics that do not track individual users across websites. We do not
          use third-party advertising cookies.
        </p>

        <h2>8. Third-Party Services</h2>
        <p>
          Our website integrates with Calendly for appointment scheduling. When you book a
          call, Calendly&apos;s own privacy policy applies to the data you enter in their
          scheduling widget.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be posted on
          this page with an updated revision date.
        </p>

        <h2>10. Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:alexey@ventolabs.com">alexey@ventolabs.com</a>.
        </p>
      </div>
    </div>
  );
}
