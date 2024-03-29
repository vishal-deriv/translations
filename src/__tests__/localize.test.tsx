import { act } from "@testing-library/react";
import { Localize } from "@/index";
import { customRender } from "@test-utils/index";

describe("Localize component", () => {
  test("test string must be rendered", async () => {
    const { findByText } = customRender(<Localize i18n_default_text="test" />);

    expect(await findByText("en test")).toBeTruthy();
  });

  test("proper translated strings must be rendered on language switch", async () => {
    const { findByText, rerender, i18nIns } = customRender(
      <Localize i18n_default_text="test" />
    );

    await act(() => {
      i18nIns.changeLanguage("ES");
    });
    expect(i18nIns.language).toBe("ES");

    // rerender the component to reflect the language change
    rerender(<Localize i18n_default_text="test" />);

    expect(await findByText("es test")).toBeTruthy();

    await act(() => {
      i18nIns.changeLanguage("KO");
    });
    expect(i18nIns.language).toBe("KO");

    // rerender the component to reflect the language change
    rerender(<Localize i18n_default_text="test" />);

    expect(await findByText("ko test")).toBeTruthy();
  });
});
