import {useState} from 'react';

const useToggle = (initialValue) => {
  const [isOpen, toggleOpen] = useState(initialValue);
  const toggle = () => {
    toggleOpen(!isOpen);
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
