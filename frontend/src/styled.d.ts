// src/styled.d.ts

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: {
        projects: string;
        requirements: string;
        tickets: string;
        tests: string;
      };
      neutral: {
        background: string;
        text: string;
        border: string;
        lightGray: string;
      };
      feedback: {
        success: string;
        error: string;
        warning: string;
        info: string;
      };
    };
    typography: {
      fontFamily: string;
      h1: { fontSize: string; fontWeight: number };
      h2: { fontSize: string; fontWeight: number };
      h3: { fontSize: string; fontWeight: number };
      body: { fontSize: string; fontWeight: number };
      small: { fontSize: string; fontWeight: number };
    };
    spacing: (factor: number) => string;
  }
}
