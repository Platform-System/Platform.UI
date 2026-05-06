"use client"

import { Icon } from "@iconify/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const SOCIAL_LINKS = [
  { icon: "mdi:instagram", href: "#", label: "Instagram" },
  { icon: "mdi:twitter",   href: "#", label: "Twitter" },
  { icon: "mdi:facebook",  href: "#", label: "Facebook" },
]

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="relative bg-background border-t border-primary/5 pt-32 pb-24">
      <div className="mx-auto max-w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          {/* Brand Info - Far Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold tracking-tighter text-foreground uppercase">
                {t("brandName")}<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mb-6 max-w-[240px]">
              {t("brandDescription")}
            </p>
            <div className="flex gap-5">
              {SOCIAL_LINKS.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} className="text-muted-foreground/60 hover:text-primary transition-colors">
                  <Icon icon={social.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns - Enhanced Support & Info */}
          <div className="flex flex-wrap gap-12 md:gap-20 lg:gap-32">
            <div>
              <h4 className="font-serif text-[13px] font-bold uppercase tracking-[0.25em] text-foreground mb-5">
                {t("sections.brand")}
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-xs font-medium tracking-wide text-muted-foreground/80 hover:text-primary transition-colors">{t("links.story")}</Link></li>
                <li><Link href="#" className="text-xs font-medium tracking-wide text-muted-foreground/80 hover:text-primary transition-colors">{t("links.craftsmanship")}</Link></li>
                <li><Link href="#" className="text-xs font-medium tracking-wide text-muted-foreground/80 hover:text-primary transition-colors">{t("links.philosophy")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-bold uppercase tracking-[0.25em] text-foreground mb-5">
                {t("sections.support")}
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-xs font-medium tracking-wide text-muted-foreground/80 hover:text-primary transition-colors">{t("links.helpCenter")}</Link></li>
                <li><Link href="#" className="text-xs font-medium tracking-wide text-muted-foreground/80 hover:text-primary transition-colors">{t("links.shippingReturns")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-bold uppercase tracking-[0.25em] text-foreground mb-5">
                {t("sections.connect")}
              </h4>
              <ul className="space-y-3">
                <li className="text-xs font-medium tracking-wide text-muted-foreground/80">
                  {t("links.hotline")}: <span className="text-foreground tracking-normal font-semibold">{t("links.hotlineValue")}</span>
                </li>
                <li className="text-xs font-medium tracking-wide text-muted-foreground/80">
                  {t("links.email")}: <span className="text-foreground tracking-normal font-semibold">{t("links.emailValue")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter - Far Right (Redesigned) */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <h4 className="font-serif text-[13px] font-bold uppercase tracking-[0.25em] text-foreground mb-5">
              {t("sections.subscribe")}
            </h4>
            <p className="text-xs font-medium tracking-wide text-muted-foreground/60 mb-6 leading-relaxed">
              {t("newsletter.description")}
            </p>
            <div className="relative flex items-center p-1.5 bg-muted/40 border border-primary/20 rounded-full focus-within:bg-muted/60 focus-within:border-primary/40 transition-all duration-300">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="w-full bg-transparent border-none pl-5 pr-24 h-11 text-xs font-medium tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0"
              />
              <button className="absolute right-1.5 bg-foreground text-background h-10 px-6 rounded-full font-serif text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary transition-colors duration-300">
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
