import { cn } from "@/lib/utils";

/** Uppercase product name (hero, auth, legal). */
export const APP_NAME = "GRIMOIRE";

/** Title case for nav / footer wordmark when design uses mixed case. */
export const APP_NAME_TITLE = "Grimoire";

type AppHeaderElement = "h1" | "h2" | "span" | "div";

export interface AppHeaderProps {
  variant?: "nav" | "auth" | "hero" | "footer";
  className?: string;
  as?: AppHeaderElement;
  /** Override displayed name (defaults by variant: `APP_NAME` vs `APP_NAME_TITLE` for nav/footer). */
  label?: string;
  /** Pixel font size for `variant="nav"` (main app header). */
  size?: string;
}

const variantClass: Record<NonNullable<AppHeaderProps["variant"]>, string> = {
  nav: "font-orbitron text-blue-500/80 text-center",
  auth: "font-orbitron text-4xl font-black tracking-[0.3em] text-white uppercase",
  hero: "font-orbitron mb-6 text-6xl font-black tracking-tight text-white md:text-8xl uppercase",
  footer: "font-orbitron text-xl font-black tracking-widest text-white",
};

function AppHeader({
  variant = "nav",
  className,
  as,
  label,
  size,
}: AppHeaderProps) {
  const text =
    label ??
    (variant === "nav" || variant === "footer" ? APP_NAME_TITLE : APP_NAME);

  const Component = as ?? (variant === "hero" || variant === "auth" ? "h1" : "span");

  return (
    <Component
      className={cn(variantClass[variant], className)}
      style={variant === "nav" && size ? { fontSize: size } : undefined}
    >
      {text}
    </Component>
  );
}

export default AppHeader;
