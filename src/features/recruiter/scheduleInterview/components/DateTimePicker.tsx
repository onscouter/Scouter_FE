import { Box, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

type DateTimePickerProps = {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
};

const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
}) => {
  const dayjsValue = value ? dayjs(value) : null;
  const [open, setOpen] = useState(false);

  const handleChange = (newValue: Dayjs | null) => {
    onChange(newValue ? newValue.toDate() : null);
  };

  return (
    <Box flex={1}>
      <Typography variant="subtitle1" mb={1}>
        Select date & time
      </Typography>

      <DateTimePicker
        label="Interview Date & Time"
        value={dayjsValue}
        onChange={handleChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            fullWidth: true,
            onClick: () => setOpen(true),
            sx: {
              maxWidth: 320,
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomDateTimePicker;
