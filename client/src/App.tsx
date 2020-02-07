import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MdSwapVert } from "react-icons/md";
import styles from "./App.module.scss";
import Select from "./Components/Select/Select";
import Conversion from "./Components/Conversion";
import { convert } from "./redux/conversionState/action_convert";
import { useDispatch, useSelector } from "react-redux";
import Stats from "./Components/Stats";
import { fetchCurrencies } from "./redux/currenciesState/action_fetchCurrencies";
import { AppState } from "./redux/store";
import { stringIsValidNumber } from "./helpers/stringIsValidNumber";


const App = () => {
  const dispatch = useDispatch();
  const currenciesState = useSelector((appState: AppState) => appState.currenciesState);
  const { currencies, meta: { err, isLoading} } = currenciesState;

  const [firstCode, setFirstCode] = useState<string | null>(null);
  const [secondCode, setSecondCode] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("1");
  const amountIsValid = stringIsValidNumber(amount);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const computedCurrencies = useMemo(() => {
    return currencies.map(currency => ({
      label: `${currency.code} ${currency.symbol ? `(${currency.symbol})` : ""} ${currency.name}`,
      value: currency.code,
    }));
  }, [currencies]);

 
  const handleSwap = () => {
    const [newSecondCode, newFirstCode] = [firstCode, secondCode];
    setFirstCode(newFirstCode);
    setSecondCode(newSecondCode);
  }

  const handleConvertClick = () => {
    firstCode &&
    secondCode &&
    amountIsValid &&
    dispatch(convert(firstCode, secondCode, parseFloat(amount)));
  }

  const buttonDisabled = firstCode === null || secondCode === null || !amountIsValid;

  return (
    <div className={styles.app}>
      <h2 className={styles.appCaption}>CURRENCY CONVERSION APP</h2>
      <div className={styles.row}>
        <div>Amount</div>
        <input
          className={styles.amountInput}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {
          !amountIsValid &&
          <div className={styles.error}>
            This is not a valid number.
          </div>
        }
      </div>
      <div className={styles.row}>
        <div>From</div>
        <Select
          options={computedCurrencies}
          value={firstCode}
          onChange={useCallback(val => setFirstCode(val), [])}
          placeholder="Select currency"
          withSearch
        />
      </div>
      {
        firstCode && secondCode &&
        <div className={styles.swapContainer}>
          <span onClick={handleSwap}>
            <MdSwapVert size={20} />
          </span>
        </div>
      }
      <div className={styles.row}>
        <div>To</div>
        <Select
          options={computedCurrencies}
          value={secondCode}
          onChange={useCallback(val => setSecondCode(val), [])}
          placeholder="Select currency"
          withSearch
        />
      </div>

      <div>
        <button
          onClick={handleConvertClick}
          className={styles.convertButton}
          disabled={buttonDisabled}
        >
          Convert
        </button>
      </div>
      <Conversion />
      <div className={styles.divider} />
      <Stats />
    </div>
  );
}

export default App;
