import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import NewISBNModal from "../newISBNModal";

const toggleModal = () => {};
const show: boolean = true;
const onSuccess = () => {};

describe("<NewISBNModal />", () => {
  it("renders", () => {
    const { queryByTestId, queryByPlaceholderText } = render(
      <NewISBNModal
        show={show}
        toggleModal={toggleModal}
        onSuccess={onSuccess}
      />
    );
    expect(queryByTestId("isbn-modal")).toBeInTheDocument();
    expect(queryByPlaceholderText("Isbn")).toBeInTheDocument();
  });
});

describe("Isbn Modal State", () => {
  it("does not render modal content when show is false", () => {
    const { queryByTestId } = render(
      <NewISBNModal
        show={false}
        toggleModal={toggleModal}
        onSuccess={onSuccess}
      />
    );
    expect(queryByTestId("isbn-form")).not.toBeInTheDocument();
  });
  it("Renders modal content when show is true", () => {
    const { queryByTestId } = render(
      <NewISBNModal
        show={true}
        toggleModal={toggleModal}
        onSuccess={onSuccess}
      />
    );
    expect(queryByTestId("isbn-form")).toBeInTheDocument();
  });
});

describe("Isbn Form Input Values", () => {
  it("updates input values on change", () => {
    const { queryByPlaceholderText } = render(
      <NewISBNModal
        show={show}
        toggleModal={toggleModal}
        onSuccess={onSuccess}
      />
    );
    const isbnInput: any = queryByPlaceholderText("Isbn");
    const titleInput: any = queryByPlaceholderText("Title");
    const authorInput: any = queryByPlaceholderText("Author");

    fireEvent.change(isbnInput, { target: { value: "789a" } });
    fireEvent.change(titleInput, { target: { value: "BookTitle" } });
    fireEvent.change(authorInput, { target: { value: "Bob" } });

    expect(isbnInput.value).toBe("789a");
    expect(titleInput.value).toBe("BookTitle");
    expect(authorInput.value).toBe("Bob");
  });
});
