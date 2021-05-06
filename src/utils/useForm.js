import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if input is meant to be a 'number';
    // - if so, it will come in as a String
    // - and will need to be converted back to Number

    // destructure the `e.target` <input> to get 'name' and 'value'
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    setValues({
      // copy existing state 'value' into it
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }

  // this now resembles the useState Hook except that it is customized to Forms
  // - we are passing back the state 'values' and a new 'update state' function
  return { values, updateValue };
}
