import { Select, TextInput } from '@mantine/core';
import classes from './ebutton.module.css';
import { useNavigate } from 'react-router-dom';

export function Ebutton(props) {

    const navigate = useNavigate();

  const handleSelectChange = (value) => {
    // Perform any additional actions based on the selected value
    // For example, navigate to a different route
    props.ondselect(value);
    navigate(`/postcreate?par=${encodeURIComponent(value)}`);
  };


  return (
    <>
      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={props.formD.map((item) => item.title)}
        placeholder="Select a community"
        onChange={handleSelectChange}
        classNames={classes}
        value={props.subT}
      />
    </>
  );
}