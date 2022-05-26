import { useReducer } from "react";
import styles from "./App.module.css";
import DigitButton from "./Components/DigitButton";
import OperationButton from "./Components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  if (type === ACTIONS.ADD_DIGIT) {
    if (payload.digit === "0" && state.currentOperand === "0") return state;
    if (payload.digit === "." && state.currentOperand.includes("."))
      return state;
    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    };
  }

  if (type === ACTIONS.CHOOSE_OPERATION) {
    if (state.currentOperand == null && state.previousOperand == null)
      return state;

    if (state.currentOperand == null) {
      return {
        ...state,
        operation: payload.operation,
      };
    }

    if (state.previousOperand == null) {
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null,
      };
    }

    return {
      ...state,
      operation: payload.operation,
      previousOperand: evaluate(state),
      currentOperand: null,
    };
  }

  if (type === ACTIONS.CLEAR) return {};
};

function evaluate({ previousOperand, currentOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let result;
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "÷":
      result = prev / curr;
      break;
    default:
      result = "";
  }
  return result.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className={styles["calculator-grid"]}>
      <div className={styles.output}>
        <div className={styles.previous}>
          {previousOperand} {operation}
        </div>
        <div className={styles.current}>{currentOperand}</div>
      </div>
      <button
        className={styles["span-two"]}
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className={styles["span-two"]}> = </button>
    </div>
  );
}

export default App;
