import React, { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (text) => {
    // console.log(text);
    setValue(text);
  };
  return { value, onChange };
};

export default useInput;
