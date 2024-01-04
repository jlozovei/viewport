import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/svelte";

import ViewportModal from "./index.svelte";

describe("ViewportModal", () => {
  it("renders", () => {
    const { getByTestId } = render(ViewportModal);

    expect(getByTestId("viewport-name")).toBeInTheDocument();
    expect(getByTestId("viewport-size")).toBeInTheDocument();
    expect(getByTestId("viewport-resolution")).toBeInTheDocument();
  });
});
