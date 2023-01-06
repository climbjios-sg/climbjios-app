import { TextFieldProps } from '@mui/material';
import { useRef, useState } from 'react';
import TextInput, { TextInputProps } from 'src/components/inputs/TextInput';

type DelayedSearchProps = {
  initialValue?: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  delay?: number;
} & TextInputProps &
  TextFieldProps;

export default function DelayedSearch({
  initialValue='',
  setSearchString,
  delay = 750,
  ...others
}: DelayedSearchProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  // I'm not very sure why, but the state value doesn't seem to be updated within the
  // setTimeout() function when another onChange happens, so useState doesn't work.
  // const [delayCounter, setDelayCounter] = useState(0);
  let delayCounter = useRef(0);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const {
      target: { value },
    } = e;

    setInputValue(value);
    delayCounter.current = delayCounter.current + 1;

    setTimeout(() => {
      delayCounter.current = delayCounter.current - 1;
      if (delayCounter.current === 0) {
        setSearchString(value);
      }
    }, delay);
  }

  return (
    <TextInput icon="ic:outline-search" value={inputValue} onChange={handleOnChange} {...others} />
  );
}
