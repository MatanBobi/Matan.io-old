import {useState} from 'react';

const useToggle = (initialValue) => {
  const [isOpen, toggleOpen] = useState(initialValue);
  const toggle = () => {
    toggleOpen(isOpenState => !isOpenState);
  };

  const open = () => {
    toggleOpen(true);
  };

  const close = () => {
    toggleOpen(false);
  };

  return [isOpen, toggle, open, close];
};

export default useToggle;
