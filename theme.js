import { useColorScheme } from "react-native";

export const LIGHT_COLORS = {
  primary:          "#A78BFA",
  primaryDark:      "#8B5CF6",
  secondary:        "#EDE9FE",
  background:       "#FCFAFF",
  card:             "#FFFFFF",
  text:             "#2D1F46",
  subtitle:         "#6B5C7D",
  border:           "#E9D5FF",
  whatsapp:         "#25D366",
  inputPlaceholder: "#9CA3AF",
};

export const DARK_COLORS = {
  primary:          "#A78BFA",
  primaryDark:      "#7C3AED",
  secondary:        "#2D1F46",
  background:       "#0F0E17",
  card:             "#1E1B2E",
  text:             "#F0EBF8",
  subtitle:         "#B8A9CC",
  border:           "#3D2A5C",
  whatsapp:         "#25D366",
  inputPlaceholder: "#6B7280",
};

export function useTheme() {
  const scheme = useColorScheme();
  return scheme === "dark" ? DARK_COLORS : LIGHT_COLORS;
}

export const COLORS = LIGHT_COLORS;
