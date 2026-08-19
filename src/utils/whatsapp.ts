const DEFAULT_MESSAGE = "Hi Yash, I found your portfolio and would like to discuss a project."

export function whatsappHref(number: string, message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
