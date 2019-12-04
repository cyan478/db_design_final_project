import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";


function DropdownPanel(props) {
  const { title, options, onDropdownSelect, selected } = props;
  return (
    <div className='dropdownPanel'>
      <div className='header' label={title}>
        {title}
      </div>
      
      {/*<Select
          className='dropdown'
          variant="filled"
          value={selected}
          onChange={(event) => onDropdownSelect(event.target.value)}
          name="Select Airline"
        >
          {options.map(option => {
            return <option value={option.name}>{option.label}</option>
          })}
        </Select>*/}

        <FormControl className="dropdown">
        <NativeSelect
          className="inner-dropdown"
          value={selected}
          onChange={(event) => onDropdownSelect(event.target.value)}
          name="Select Airline"
        >
          {options.map(option => {
            return <option value={option.name}>{option.label}</option>
          })}
        </NativeSelect>
      </FormControl>

    </div>
  );
}

export default DropdownPanel;
