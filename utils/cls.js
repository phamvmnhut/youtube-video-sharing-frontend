export const cls = (input) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond) => typeof cond === "string")
    .join(" ")
    .trim();

export const clsV2 = (...args) =>
  args
    .filter((cond) => typeof cond === "string")
    .join(" ")
    .trim();
