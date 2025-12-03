import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Timeline from "./components/Timeline";

describe("Timeline", () => {
  it("renders all configured weeks", () => {
    const markup = renderToStaticMarkup(<Timeline />);

    [
      "Week of Jan 30, 2026",
      "Week of Feb 6, 2026",
      "Week of Feb 13, 2026",
      "Week of Feb 20, 2026",
      "Week of Feb 27, 2026",
    ].forEach((week) => {
      expect(markup).toContain(week);
    });
  });
});
