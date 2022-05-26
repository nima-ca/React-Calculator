import styles from "./App.module.css";
import DigitButton from "./Components/DigitButton";
import OperationButton from "./Components/OperationButton";
import useCalculator, { ACTIONS } from "./Hooks/useCalculator";

function App() {
  const { currentOperand, previousOperand, operation, dispatch } =
    useCalculator();

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
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
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
      <button
        className={styles["span-two"]}
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        {" "}
        ={" "}
      </button>
    </div>
  );
}

export default App;
