"use client"

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl"
import React from "react"

interface I18nProviderProps {
  messages: AbstractIntlMessages
  locale: string
  children: React.ReactNode
}

export default function I18nProvider({ messages, locale, children }: I18nProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Ho_Chi_Minh">
      {children}
    </NextIntlClientProvider>
  )
}

