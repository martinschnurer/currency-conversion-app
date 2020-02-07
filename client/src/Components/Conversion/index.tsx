import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import loaderSvg from "../../assets/loader.svg";
import styles from "./index.module.scss";
import { roundTwoDecimals } from "../../helpers/round";

const Conversion = () => {
  
  const {
    convertedFrom,
    convertedTo,
    inputAmount,
    meta,
    targetAmount,
    rate,
  } = useSelector((state: AppState) => state.conversionState);
  
  if (meta.isLoading) {
    return (
      <div className={styles.container}>
        <img alt="loading" className={styles.loader} src={loaderSvg} />
      </div>
    )
  }

  if (meta.error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{meta.error}</div>
      </div>
    )
  }

  if (convertedFrom === null || convertedTo === null) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainConversion}>
        {inputAmount} {convertedFrom} = {roundTwoDecimals(targetAmount || 0)} {convertedTo}
      </div>
      {
        inputAmount !== 1 && rate &&
        <div className={styles.rateInfo}>
          1 {convertedFrom} = {roundTwoDecimals(rate)} {convertedTo}
        </div>
      }
    </div>
  )
}

export default Conversion;