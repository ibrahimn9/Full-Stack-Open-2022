import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("test creating new blog", () => {
    const createBlog = jest.fn();
  
    const { container } = render(<BlogForm createBlog={createBlog} />);
  
    const title = container.querySelector(".title");
    const author = container.querySelector(".author");
    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");
    const form = container.querySelector(".form");
  
    userEvent.change(title, {
      target: {value: "new Blog"},
    });
  
    userEvent.change(author, {
      target: {value: "ibrahim"},
    });
  
    userEvent.change(url, {
      target: {value: "https://ibrahim.com"},
    });
  
    userEvent.change(likes, {
      target: {value: 120},
    });
  
    userEvent.submit(form);
  
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("new Blog");
    expect(createBlog.mock.calls[0][0].author).toBe("ibrahim");
    expect(createBlog.mock.calls[0][0].url).toBe("https://ibrahim.com");
    expect(createBlog.mock.calls[0][0].likes).toBe("120");
  });