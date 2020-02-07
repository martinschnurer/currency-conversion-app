import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { fetchStats } from "../../redux/statsState/action_fetchStats";
import styles from "./index.module.scss";
import { roundTwoDecimals } from "../../helpers/round";
import { MdInsertChart } from "react-icons/md";

const Stats = () => {
  const intervalRef = useRef<any>();
  const dispatch = useDispatch();
  const stats = useSelector((state: AppState) => state.statsState);

  useEffect(() => {
    dispatch(fetchStats());
    intervalRef.current = setInterval(() => {
      dispatch(fetchStats());
    }, 30 * 1000); // every 30 secs

    // cleanup interval when unmount
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {
        stats.meta.error &&
        <div className={styles.error}>{stats.meta.error}</div>
      } 

      <MdInsertChart className={styles.icon} size={30} />
      
      <div className={styles.stat}>
        <div className={styles.number}>{stats.topCurrency}</div>
        <div className={styles.label}>is the most popular target currency</div>
      </div>

      <div className={styles.stat}>
        <div className={styles.number}>$ {roundTwoDecimals(stats.totalUSD)}</div>
        <div className={styles.label}>Total converted amount (in dollars)</div>
      </div>
      
      <div className={styles.stat}>
        <div className={styles.number}>{stats.conversions}</div>
        <div className={styles.label}>conversions since app took its first breath</div>
      </div>

    </div>
  )
}

export default Stats;