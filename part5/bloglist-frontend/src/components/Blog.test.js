import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("blog testing", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "ibrahim",
    url: "https://ibrahim.com",
    likes: 120,
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} handleShowDetail={mockHandler} />
  );

  test("renders title and author", () => {
    expect(container).toHaveTextContent(blog.title);
    expect(container).toHaveTextContent(blog.author);
    expect(container).not.toHaveTextContent(blog.likes);
    expect(container).not.toHaveTextContent(blog.url);
  });

  test("renders likes and url when clicking btn", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(container).toHaveTextContent(blog.likes);
    expect(container).toHaveTextContent(blog.url);
  });

  test("like button clicked twice", async() => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });


});
