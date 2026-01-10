export function toggleDarkMode() {
  const root = document.documentElement
  const isDark = root.classList.toggle("dark")
  localStorage.setItem("theme", isDark ? "dark" : "light")
}

export function isDarkMode() {
  return document.documentElement.classList.contains("dark")
}
