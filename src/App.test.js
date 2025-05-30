import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders all the elements", () => {
  render(<App />);
  const searchBar = screen.getByPlaceholderText(/Search commands/i);
  expect(searchBar).toBeInTheDocument();

  const commandList = screen.getByRole("list");
  expect(commandList).toBeInTheDocument();

  const darkModeToggle = screen.getByRole("button", {
    name: /toggle dark mode/i,
  });
  expect(darkModeToggle).toBeInTheDocument();
});
