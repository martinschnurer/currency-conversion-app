import React, { useState, useRef, useCallback, useMemo } from "react";
import cx from "classnames";
import styles from "./Select.module.scss";
import { MdDone, MdSearch } from "react-icons/md";
import { useOutsideClickEvent } from "../../helpers/useOutsideClickEvent";

interface SelectProps {
  value: any | null;
  options: {
    label: string;
    value: any;
  }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  small?: boolean;
  withSearch?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  placeholder = "",
  className = "",
  small = false,
  withSearch = false,
}) => {
  
  const [opened, setOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const ref = useRef(null);
  
  const closeSelect = useCallback(() => {
    setOpened(false);
    setSearchInput("");
  }, []);
  
  useOutsideClickEvent(ref, closeSelect);

  const optionSelectHander = useCallback((v: any) => {
    if (onChange && value !== v) {
      onChange(v);
    }
    setOpened(false);
  }, [value, onChange])

  const showLabel = useMemo(
    () => value === null ? placeholder : options.find(o => o.value === value)!.label,
    [options, value, placeholder]);

  return (
    <div
      ref={ref}
      className={
        cx(
          styles.select, 
          className, {
            [styles.small]: small,
          }
        )
      }
    >
      {
        opened && withSearch ? (
          <div className={styles.searchBox}>
            <MdSearch />
            <input
              autoFocus
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        ) : (
          <div
            className={styles.inputBox}
            onClick={() => setOpened(!opened)}
          >
            {showLabel}
          </div>
        )
      }
      
      {
        opened && (
          <div className={styles.options}>
            {
              [...options]
              .filter(option => (option.label.toLocaleLowerCase()).includes(searchInput.toLowerCase()))
              .map(option => (
                <div
                  key={option.value}
                  onClick={() => optionSelectHander(option.value)}
                  className={cx(styles.option, {
                    [styles.active]: option.value === value,
                  })}
                >
                  <div className={styles.label}>{option.label}</div>
                  {value === option.value && <MdDone color="#444" />}
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default React.memo(Select);
