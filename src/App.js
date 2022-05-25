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
};

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
      <button className={styles["span-two"]}>AC</button>
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
