import { describe, expect, test } from "vitest";
import { Localize } from "@components/index";
import { render, screen } from "@/utils/test-utils";

describe("Localize component", () => {
  test("test string must be rendered", () => {
    render(<Localize i18n_default_text="test" />);

    expect(screen.getByText("test")).toBeTruthy();
  });
});
