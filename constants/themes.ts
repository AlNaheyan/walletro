import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Colors } from './Colors'; 

// Extend DefaultTheme for light mode
export const CustomLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: Colors.light.background,
    text: Colors.light.text,
  },
};

// Extend DarkTheme for dark mode
export const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: Colors.dark.background,
    text: Colors.dark.text,
  },
};