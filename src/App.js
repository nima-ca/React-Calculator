import styles from "./App.module.css";
import DigitButton from "./Components/DigitButton";
import OperationButton from "./Components/OperationButton";
import useCalculator, { ACTIONS } from "./Hooks/useCalculator";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

function App() {
  const { currentOperand, previousOperand, operation, dispatch } =
    useCalculator();

  return (
    <div className={styles["calculator-grid"]}>
      <div className={styles.output}>
        <div className={styles.previous}>
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className={styles.current}>{formatOperand(currentOperand)}</div>
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
