"use client";

import { NAV_LINKS, WHATSAPP_LINKS } from "@/lib/site";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useHeroReveal } from "./HeroRevealContext";

export function Navigation() {
  const { revealComplete } = useHeroReveal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!revealComplete) setOpen(false);
  }, [revealComplete]);

  const showSolidNav = revealComplete || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out ${
        revealComplete
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        showSolidNav
          ? "border-b border-ink/8 bg-cream/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      aria-hidden={!revealComplete}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-cream"
      >
        Ir para o conteúdo principal
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link href="#section_one" className="relative z-10 flex items-center gap-3">
          <Image
            src="/assets/images/logo_agni_white.png"
            alt="Logo Sua Arquiteta - Agni Garcia Arquitetura"
            width={140}
            height={40}
            className={`h-8 w-auto transition-all duration-500 md:h-9 ${
              showSolidNav ? "brightness-0" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`cursor-pointer text-sm tracking-wide transition-colors duration-300 hover:text-brand ${
                showSolidNav ? "text-ink/80" : "text-cream/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINKS.geral}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 text-xs"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className={`relative z-10 cursor-pointer rounded-full p-2 transition-colors lg:hidden ${
            showSolidNav ? "text-ink" : "text-cream"
          }`}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/8 bg-cream/98 px-5 py-6 backdrop-blur-md lg:hidden">
          <nav aria-label="Menu mobile" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer text-base text-ink/85"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINKS.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2 w-full py-3.5"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
