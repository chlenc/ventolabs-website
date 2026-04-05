import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Vento Labs AI automation services.",
};

export default function TermsPage() {
  return (
    <div className="legal">
      <div className="container container--narrow">
        <h1>Terms of Use</h1>
        <p>Last updated: April 2026</p>

        <h2>1. Services</h2>
        <p>
          Vento Labs (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides AI automation
          consulting, implementation, and training services. By engaging our services, you
          agree to these terms.
        </p>

        <h2>2. Free AI Assistant Setup</h2>
        <p>
          Vento Labs offers a complimentary AI assistant setup as a demonstration of our
          capabilities. This free setup is provided on the condition that the client agrees to
          engage Vento Labs for additional services following the initial deployment.
        </p>
        <p>
          The free setup includes a basic AI assistant configuration as described during the
          discovery call. Any customization, additional features, or ongoing maintenance
          beyond the initial setup constitutes paid services.
        </p>
        <p>
          Infrastructure costs (cloud hosting, AI model API usage) are the responsibility of
          the client and are billed directly by the respective providers.
        </p>

        <h2>3. Client Responsibilities</h2>
        <ul>
          <li>Provide accurate information about your business processes and requirements</li>
          <li>Ensure necessary access to systems and tools required for implementation</li>
          <li>Review and approve deliverables in a timely manner</li>
          <li>Pay infrastructure costs (AI model APIs, hosting) on your own accounts</li>
          <li>Comply with applicable laws regarding AI usage in your industry</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          Custom automations, configurations, and workflows created for your business belong
          to you. Our proprietary methodologies, templates, and tools remain our intellectual
          property. Open-source components are governed by their respective licenses.
        </p>

        <h2>5. Data Handling</h2>
        <p>
          We access client data solely for the purpose of implementing and maintaining
          agreed-upon automations. We do not store, sell, or share client data beyond what is
          necessary for service delivery. See our{" "}
          <a href={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/privacy"}>Privacy Policy</a> for details.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          AI-powered systems may produce inaccurate or unexpected outputs. While we implement
          safeguards, guardrails, and testing procedures, we cannot guarantee 100% accuracy
          of AI-generated content or decisions. Clients should implement appropriate review
          processes for critical operations.
        </p>
        <p>
          Our liability is limited to the fees paid for services in the preceding 12 months.
          We are not liable for indirect, consequential, or incidental damages.
        </p>

        <h2>7. Termination</h2>
        <p>
          Either party may terminate the engagement with 14 days written notice. Upon
          termination, we will provide all necessary credentials, documentation, and
          knowledge transfer to ensure continuity of your automations.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of Delaware, United States.
          Disputes shall be resolved through good-faith negotiation before pursuing formal
          remedies.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Significant changes will be
          communicated to active clients via email. Continued use of our services constitutes
          acceptance of updated terms.
        </p>

        <p style={{ marginTop: "3rem" }}>
          Questions? Contact us at{" "}
          <a href="mailto:hello@ventolabs.com">hello@ventolabs.com</a>.
        </p>
      </div>
    </div>
  );
}
