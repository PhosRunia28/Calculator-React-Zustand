import { create } from "zustand";
export const useCalculatorStore = create((set) => ({
  previousOperand: null,
  operation: null,
  currentOperand: "0",
  addDigit: (digit: string) =>
    set((state: { currentOperand: string }) => ({
      currentOperand: addCurrentOperand(digit, state.currentOperand),
    })),
  chooseOperation: (operation: string) =>
    set(
      (state: {
        previousOperand: string;
        operation: string;
        currentOperand: string;
      }) => ({
        previousOperand:
          operation === state.operation
            ? state.previousOperand
            : state.previousOperand === null
            ? state.currentOperand
            : state.previousOperand,
        operation: operation,
        currentOperand:
          operation === state.operation
            ? state.currentOperand
            : state.currentOperand === "0" || state.previousOperand !== null
            ? state.currentOperand
            : "0",
      })
    ),
  deleteOperand: () => {
    set((state: { currentOperand: string }) => ({
      currentOperand:
        state.currentOperand.length === 1
          ? "0"
          : state.currentOperand.slice(0, -1),
    }));
  },
  clear: () =>
    set(() => ({
      previousOperand: null,
      operation: null,
      currentOperand: "0",
    })),
  calculate: () => {
    set(
      (state: {
        currentOperand: string;
        previousOperand: string;
        operation: string;
      }) => ({
        currentOperand: evaluteExpession(
          state.previousOperand,
          state.currentOperand,
          state.operation
        ),
        previousOperand: null,
        operation: null,
      })
    );
  },
}));

function addCurrentOperand(digit: string, currentOperand: string) {
  if (digit === "0") {
    return currentOperand === "0" ? "0" : currentOperand + digit;
  }
  if (digit === ".") {
    return currentOperand.includes(".")
      ? currentOperand
      : currentOperand + digit;
  }
  return currentOperand === "0" ? digit : currentOperand + digit;
}

function evaluteExpession(
  previousOperand: string,
  currentOperand: string,
  operation: string
) {
  const num1 = parseFloat(previousOperand);
  const num2 = parseFloat(currentOperand);
  if (operation === "+") {
    return (num1 + num2).toString();
  } else if (operation === "-") {
    return (num1 - num2).toString();
  } else if (operation === "/") {
    return (num1 / num2).toString();
  } else if (operation === "*") {
    return (num1 * num2).toString();
  }
}
