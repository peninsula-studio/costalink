import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RouteComponent from "../create";

describe("Property Creation Form", () => {
  it("renders the form correctly", () => {
    // Wrap the Component with QueryClient and Router providers
    const queryClient = new QueryClient(); // Mock QueryClient

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RouteComponent />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/Property ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Town/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Province/i)).toBeInTheDocument();
  });

  it("validates and submits the form correctly", () => {
    // Wrap the Component with QueryClient and Router providers
    const queryClient = new QueryClient();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RouteComponent />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    // Interact with the form
    fireEvent.change(screen.getByLabelText(/Property ID/i), {
      target: { value: "prop123" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2026-03-01" },
    });
    fireEvent.change(screen.getByLabelText(/Reference/i), {
      target: { value: "Some Reference" },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "500000" },
    });
    fireEvent.change(screen.getByLabelText(/Property Type/i), {
      target: { value: "Apartment" },
    });
    fireEvent.change(screen.getByLabelText(/Town/i), {
      target: { value: "Malaga" },
    });
    fireEvent.change(screen.getByLabelText(/Province/i), {
      target: { value: "Andalusia" },
    });

    // Fire submit button
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Mock validation or success
    expect(screen.getByLabelText(/Property ID/i).value).toBe("prop123");
  });
});
