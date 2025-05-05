import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserFormValidation from "../userInfo";

describe("UserFormValidation Component", () => {
  test("renders input fields and submit button", () => {
    render(<UserFormValidation />);
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("shows error message when fields are empty", () => {
    render(<UserFormValidation />);
    fireEvent.click(screen.getByText("Submit"));
    expect(
      screen.getByText("❌ Please fill out all fields.")
    ).toBeInTheDocument();
  });

  test("shows success message when fields are filled", () => {
    render(<UserFormValidation />);
    fireEvent.change(screen.getByPlaceholderText("Enter name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("✅ Submission successful!")).toBeInTheDocument();
  });

  test("clears input fields after successful submission", () => {
    render(<UserFormValidation />);
    const nameInput = screen.getByPlaceholderText("Enter name");
    const emailInput = screen.getByPlaceholderText("Enter email");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
