import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import NoticeDetail from "../NoticeDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("@mui/material/useMediaQuery");

const notices = [
  {
    id: "1",
    title: "Test Notice 1",
    publicationDate: { seconds: 1615158000 },
    content: "Content for notice 1",
  },
];

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

describe("NoticeDetail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockedUseParams = jest.requireMock("react-router-dom").useParams;
    mockedUseParams.mockReturnValue({ noticeId: "1" });

    const mockedUseNavigate = jest.requireMock("react-router-dom").useNavigate;
    mockedUseNavigate.mockReturnValue(jest.fn());
  });

  it("renders notice details correctly", () => {
    renderWithRouter(<NoticeDetail notices={notices} />);

    expect(screen.getByText("Test Notice 1")).toBeInTheDocument();
    expect(screen.getByText(/Published on/)).toBeInTheDocument();
    expect(screen.getByText("Content for notice 1")).toBeInTheDocument();
  });

  it("navigates back to dashboard when back button is clicked", () => {
    renderWithRouter(<NoticeDetail notices={notices} />);

    fireEvent.click(screen.getByText("Back"));

    expect(
      jest.requireMock("react-router-dom").useNavigate
    ).toHaveBeenCalledWith();
  });
});
