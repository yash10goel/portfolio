import { ChatIcon } from '@/components/icons'
import { profile } from '@/data/profile'
import { whatsappHref } from '@/utils/whatsapp'

export function WhatsAppButton() {
  if (!profile.whatsapp) return null

  return (
    <a
      href={whatsappHref(profile.whatsapp)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface text-text shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent sm:h-auto sm:w-auto sm:px-4 sm:py-3"
    >
      <ChatIcon width={18} height={18} />
      <span className="hidden text-sm font-medium sm:inline">Let&rsquo;s Talk</span>
    </a>
  )
}
