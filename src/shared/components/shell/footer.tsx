"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="relative bg-background pt-12 pb-12 border-t border-border/10">
      <div className="mx-auto max-w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          {/* Brand Info - Far Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold tracking-tighter text-foreground uppercase">
                Nyxoris<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mb-6 max-w-[240px]">
              {t("brandDescription")}
            </p>
            <div className="flex gap-5">
              {[InstagramIcon, TwitterIcon, FacebookIcon].map((Icon, i) => (
                <Link key={i} href="#" className="text-muted-foreground/60 hover:text-primary transition-colors">
                  <Icon className="h-4 w-4" />
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
