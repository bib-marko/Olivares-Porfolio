import { ref, onMounted } from "vue";

export function useTheme() {
  const isDark = ref(false);
  const STORAGE_KEY = "user-theme";

  const updateHtmlClass = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem(STORAGE_KEY, isDark.value ? "dark" : "light");
    updateHtmlClass(isDark.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    isDark.value = savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    updateHtmlClass(isDark.value);
  });

  return { isDark, toggleTheme };
}
