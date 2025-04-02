import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

const DATE_FORMAT = "YYYY/MM/DD";

export const FormInputDate = ({
  name,
  renderInput,
  control,
  variant,
  disabled,
  rules,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        rules={rules}
        name={name}
        control={control}
        disabled={disabled}
        render={({ field }) => (
          <DatePicker
            fullWidth
            format={DATE_FORMAT}
            variant={variant}
            autoOk
            renderInput={renderInput}
            {...field}
          />
        )}
      />
    </LocalizationProvider>
  );
};
