// src/theme.ts

import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: {
      projects: "#007BFF",
      requirements: "#28A745",
      tickets: "#FD7E14",
      tests: "#6F42C1",
    },
    neutral: {
      background: "#F5F5F5",
      text: "#333333",
      border: "#CCCCCC",
      lightGray: "#F0F0F0",
    },
    feedback: {
      success: "#28A745",
      error: "#DC3545",
      warning: "#FFC107",
      info: "#17A2B8",
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
    h1: { fontSize: "32px", fontWeight: 700 },
    h2: { fontSize: "24px", fontWeight: 600 },
    h3: { fontSize: "20px", fontWeight: 600 },
    body: { fontSize: "16px", fontWeight: 400 },
    small: { fontSize: "14px", fontWeight: 400 },
  },
  spacing: (factor: number) => `${factor * 8}px`,
};

export default theme;
