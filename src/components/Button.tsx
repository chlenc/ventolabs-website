import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "on-dark" | "on-forest";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} type="button">
      {children}
    </button>
  );
}
