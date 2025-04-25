import { useState, useEffect } from 'react';
import { useDebounce } from '../../utils/useDebounce.ts';

import styles from './searchInput.module.scss';

type SearchInputProps = {
  onSearch: (value: string) => void;
  delay?: number;
  placeholder?: string;
};

const SearchInput = ({
  onSearch,
  delay,
  placeholder = 'Search...',
}: SearchInputProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, delay);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched) {
      setTouched(true);
      return;
    }
    onSearch(debouncedValue);
}, [debouncedValue, onSearch]);

  return (
    <input
      className={styles.searchInput}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      data-testid='search-input'
    />
  );
};

export default SearchInput;
