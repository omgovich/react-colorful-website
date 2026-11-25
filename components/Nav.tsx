import { links } from "@/lib/links";

export function Nav() {
  return (
    <nav className="nav">
      <span className="logo">
        <span className="logo-dot" aria-hidden />
        react-colorful
      </span>
      <div className="nav-links">
        <a href={links.docs} target="_blank" rel="noreferrer">Docs</a>
        <a href={links.npm} target="_blank" rel="noreferrer">npm</a>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </nav>
  );
}
