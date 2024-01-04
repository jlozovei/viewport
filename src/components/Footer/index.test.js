import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/svelte";

import Footer from "./index.svelte";

describe("Footer", () => {
  it("renders", () => {
    const { getByText } = render(Footer);

    expect(getByText("GitHub")).toBeInTheDocument();
    expect(getByText("jlozovei")).toBeInTheDocument();
  });
});
