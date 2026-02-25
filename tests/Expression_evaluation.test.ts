import { describe, it, expect } from "vitest";
import { evaluateExpression } from "../Expression_Evaluation.ts";

describe("evaluateExpression", () => {
  it("should evaluate simple division", () => {
    expect(evaluateExpression("12 / 4")).toBe(3);
  });

  it("should respect operator precedence", () => {
    expect(evaluateExpression("5 + 2 * 3")).toBe(11);
  });

  it("should evaluate expression with parentheses", () => {
    expect(evaluateExpression("5 * ( 6 + 2 ) - 12 / 4")).toBe(37);
  });

  it("should handle decimal numbers", () => {
    expect(evaluateExpression("5.2 + 3.1")).toBeCloseTo(8.3);
  });

  it("should handle divide by zero", () => {
    expect(evaluateExpression("5 / 0")).toBe(Infinity);
  });

  it("should return undefined for empty input", () => {
    expect(evaluateExpression("")).toBe(undefined);
  });

  it("should return undefined for invalid parentheses", () => {
    expect(evaluateExpression("5 + 3 )")).toBe(undefined);
  });

  it("should return undefined for invalid expression", () => {
    expect(evaluateExpression("5 + a")).toBe(undefined);
  });
});
