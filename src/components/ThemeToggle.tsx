import { useTheme } from '@/hooks/useTheme'
import { MoonIcon, SunIcon } from '@/components/icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={!isDark}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {isDark ? <SunIcon width={17} height={17} /> : <MoonIcon width={17} height={17} />}
    </button>
  )
}
