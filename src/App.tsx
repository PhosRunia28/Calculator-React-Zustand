import { useShallow } from "zustand/react/shallow";
import "./index.css";
import { useCalculatorStore } from "./store/CalculatorStore";
type CalculatorState = {
  currentOperand: string;
  operation: string | null;
  previousOperand: string | null;
  addDigit: (digit: string) => void;
  chooseOperation: (operation: string) => void;
  clear: () => void;
  calculate: () => void;
  deleteOperand: () => void;
};
function App() {
  const {
    addDigit,
    chooseOperation,
    currentOperand,
    operation,
    previousOperand,
    clear,
    calculate,
    deleteOperand,
  } = useCalculatorStore(
    useShallow((state) => ({
      addDigit: (state as CalculatorState).addDigit,
      chooseOperation: (state as CalculatorState).chooseOperation,
      currentOperand: (state as CalculatorState).currentOperand,
      operation: (state as CalculatorState).operation,
      previousOperand: (state as CalculatorState).previousOperand,
      clear: (state as CalculatorState).clear,
      calculate: (state as CalculatorState).calculate,
      deleteOperand: (state as CalculatorState).deleteOperand,
    }))
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={clear}>
        AC
      </button>
      <button onClick={deleteOperand}>DEL</button>
      <button onClick={() => chooseOperation("/")}>÷</button>
      <button onClick={() => addDigit("1")}>1</button>
      <button onClick={() => addDigit("2")}>2</button>
      <button onClick={() => addDigit("3")}>3</button>
      <button onClick={() => chooseOperation("*")}>*</button>
      <button onClick={() => addDigit("4")}>4</button>
      <button onClick={() => addDigit("5")}>5</button>
      <button onClick={() => addDigit("6")}>6</button>
      <button onClick={() => chooseOperation("+")}>+</button>
      <button onClick={() => addDigit("7")}>7</button>
      <button onClick={() => addDigit("8")}>8</button>
      <button onClick={() => addDigit("9")}>9</button>
      <button onClick={() => chooseOperation("-")}>-</button>
      <button onClick={() => addDigit(".")}>.</button>
      <button onClick={() => addDigit("0")}>0</button>
      <button className="span-two" onClick={calculate}>
        =
      </button>
    </div>
  );
}

export default App;
