import { describe, it, expect } from "vitest";
import { evaluateExpression } from "../Expression_Evaluation.ts";

describe("evaluateExpression", () => {
  it("should evaluate simple division", () => {
    expect(evaluateExpression("12 / 4")).toBe(3);
  });

  it("should evaluate simple division", () => {
    expect(evaluateExpression("5 * ( 6 + 2 ) - 12 / 4")).toBe(37);
  });

  it("should respect operator precedence", () => {
    expect(evaluateExpression("5 + 2 * 3")).toBe(11);
  });

  it("should evaluate expression with parentheses", () => {
    expect(
      evaluateExpression("5 * ( 6 + ( 2 + 3 / 5 - ( 8 + 2 ) ) ) - 12 / 4"),
    ).toBeCloseTo(-10.0);
  });

  it("should return undefined for invalid expression", () => {
    expect(evaluateExpression("2 + 3 6")).toBe(undefined);
  });

  it("should return undefined for invalid expression", () => {
    expect(evaluateExpression("2 + 5 -")).toBe(undefined);
  });

  it("should handle divide by zero", () => {
    expect(() => evaluateExpression("5 / 0")).toThrow("Division by zero");
  });
  it("should handle divide by zero", () => {
    expect(() => evaluateExpression("5 % 0")).toThrow("Division by zero");
  });
  it("should handle modular", () => {
    expect(evaluateExpression("5 % 5")).toBe(0);
  });

  it("should throw error for empty input", () => {
    expect(() => evaluateExpression("")).toThrow("Expression cannot be empty");
  });

  it("should throw error for invalid parentheses", () => {
    expect(() => evaluateExpression("( 5 + 3")).toThrow("Invalid parenthesis");
  });

  it("should throw error for invalid parentheses", () => {
    expect(() => evaluateExpression("5 + 3 )")).toThrow("Invalid parenthesis");
  });

  it("should return undefined for invalid expression", () => {
    expect(evaluateExpression("5 + a")).toBe(undefined);
  });
});
