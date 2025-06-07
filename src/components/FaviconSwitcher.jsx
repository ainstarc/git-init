import { useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";

export default function FaviconSwitcher() {
  const { theme } = useThemeContext();

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (!favicon) return;

    if (theme === "dark" || theme === "nord") {
      favicon.href = "/public/Git-Icon-Black.png";
    } else {
      favicon.href = "/public/Git-Icon-White.png";
    }
  }, [theme]);

  return null; // no UI
}
