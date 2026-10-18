const DEFAULT_MESSAGE = "Hi Yash, I found your portfolio and would like to discuss a project."

/** Prefill used by the business-facing CTAs (hero, packages, footer, floating button). */
export const BUSINESS_ENQUIRY_MESSAGE =
  'Hi, I am interested in a business website. My business type is ____. Please share your packages and quotation.'

/**
 * Builds a wa.me click-to-chat link. The number is reduced to digits so a value
 * like "+91 98765 43210" in the env var still produces a valid link; the
 * message is URI-encoded so spaces, ₹, newlines and "&" survive intact.
 */
export function whatsappHref(number: string, message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
