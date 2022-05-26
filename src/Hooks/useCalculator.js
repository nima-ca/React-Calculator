import { useReducer } from "react";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  if (type === ACTIONS.ADD_DIGIT) {
    if (state.overwrite) {
      return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      };
    }
    if (payload.digit === "0" && state.currentOperand === "0") return state;
    if (payload.digit === "." && state.currentOperand == null) return state;
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

  if (type === ACTIONS.EVALUATE) {
    if (
      state.previousOperand == null ||
      state.currentOperand == null ||
      state.operation == null
    )
      return state;

    return {
      ...state,
      overwrite: true,
      operation: null,
      previousOperand: null,
      currentOperand: evaluate(state),
    };
  }

  if (type === ACTIONS.DELETE_DIGIT) {
    if (state.overwrite) {
      return {
        ...state,
        currentOperand: null,
        overwrite: false,
      };
    }
    if (state.currentOperand == null) return state;
    if (state.currentOperand.length === 1) {
      return {
        ...state,
        currentOperand: null,
      };
    }
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1),
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

const useCalculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return { currentOperand, previousOperand, operation, dispatch };
};

export default useCalculator;
