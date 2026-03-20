import Link from "next/link";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Integrations", href: "/integrations" },
      { name: "Updates", href: "/updates" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange ">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2 flex flex-col gap-6">
            <div>
              <img
                src="/logo_w_icon_white.svg"
                alt="Manayja"
                className="h-10"
              />
              <p className="font-montserrat text-white/75 text-sm leading-relaxed mt-3 max-w-xs">
                AI-powered budget tracking for real people individuals,
                families, and growing businesses.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <div key={social.label} className="hover:-translate-y-1 ease-in-out transition-all duration-300">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white/70 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Early access pill */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-montserrat text-xs text-white font-medium">
                Early access — now open
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4 ">
              <h3 className="font-mouser text-white/50 text-xs tracking-widest uppercase">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-montserrat text-sm text-white/70 hover:text-white transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-montserrat text-xs text-white/60">
            © {currentYear} Manayja. Built with care, not shortcuts.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-montserrat text-xs text-white/60 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <span className="text-white/30">·</span>
            <Link
              href="/terms"
              className="font-montserrat text-xs text-white/60 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <span className="text-white/30">·</span>
            <Link
              href="/security"
              className="font-montserrat text-xs text-white/60 hover:text-white transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
