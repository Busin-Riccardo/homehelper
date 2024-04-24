import { FormattedMessage } from 'react-intl';
import { Input } from './input';

export interface TimePickerInputProps {
  value: Date | undefined | null;
  onChange: (date: Date) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  inputs: Array<'hours' | 'minutes' | 'seconds'>;
}

export function TimePickerInput({
  value,
  onChange,
  onBlur: onBlurCb,
  inputs,
}: TimePickerInputProps) {
  if (import.meta.env.DEV) {
    inputs.forEach((e, i, arr) => {
      if (arr.indexOf(e) !== i) {
        throw new Error('time picker input inputs cannot be repeated');
      }
    });
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    if (
      e.currentTarget.nextSibling &&
      e.currentTarget.nextSibling instanceof HTMLInputElement
    ) {
      e.currentTarget.nextSibling.focus();
    } else {
      onBlurCb(e);
    }
  }

  return (
    <div className="flex flex-row gap-2">
      {inputs.map(input => {
        return (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium pl-0.5">
              {
                {
                  seconds: (
                    <FormattedMessage id="app.time-input.labels.seconds" />
                  ),
                  minutes: (
                    <FormattedMessage id="app.time-input.labels.minutes" />
                  ),
                  hours: <FormattedMessage id="app.time-input.labels.hours" />,
                }[input]
              }
            </span>
            <Input
              key={input}
              value={getFromValue(value, input) ?? 0}
              inputMode="numeric"
              className="max-w-12"
              onChange={e => {
                e.target.value = String(parseInt(e.target.value));
                onChange(makeNewValueFromChangeEvent(e, input, value));
              }}
              onBlur={onBlur}
            />
          </div>
        );
      })}
    </div>
  );
}

function getFromValue(
  value: TimePickerInputProps['value'],
  input: TimePickerInputProps['inputs'][number],
) {
  switch (input) {
    case 'hours':
      return value?.getHours();
    case 'minutes':
      return value?.getMinutes();
    case 'seconds':
      return value?.getSeconds();
  }
}

function makeNewValueFromChangeEvent(
  e: React.ChangeEvent<HTMLInputElement>,
  input: TimePickerInputProps['inputs'][number],
  value: TimePickerInputProps['value'],
) {
  const date = value ?? new Date(0);

  let inputIntVal = parseInt(e.target.value);
  if (isNaN(inputIntVal)) inputIntVal = 0;

  switch (input) {
    case 'hours':
      date.setHours(inputIntVal > 23 ? 23 : inputIntVal < 0 ? 0 : inputIntVal);
      break;
    case 'minutes':
      date.setMinutes(
        inputIntVal > 59 ? 59 : inputIntVal < 0 ? 0 : inputIntVal,
      );
      break;
    case 'seconds':
      date.setSeconds(
        inputIntVal > 59 ? 59 : inputIntVal < 0 ? 0 : inputIntVal,
      );
      break;
  }

  return date;
}
