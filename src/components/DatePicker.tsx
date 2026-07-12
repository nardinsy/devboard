import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// TODO date type
export const DatePicker = <T extends FieldValues>({
  field,
  className,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  className: string;
}) => {
  const date = field.value ? new Date(field.value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          data-empty={!date}
          className={clsx(
            'w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground',
            className
          )}
        >
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => field.onChange(d ? d.toString() : '')}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};
