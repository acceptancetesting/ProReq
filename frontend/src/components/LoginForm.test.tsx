// src/components/LoginForm.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../pages/LoginForm";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter as Router } from "react-router-dom";

test("renders login form", () => {
  render(
    <Provider store={store}>
      <Router>
        <LoginForm />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test("allows user to input email and password", () => {
  render(
    <Provider store={store}>
      <Router>
        <LoginForm />
      </Router>
    </Provider>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  fireEvent.change(emailInput, { target: { value: "user@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  expect(emailInput).toHaveValue("user@example.com");
  expect(passwordInput).toHaveValue("password123");
});
