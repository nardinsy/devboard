import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldError, FieldLabel } from './ui/field';

interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  items: { value: string; name: string }[];
}

export const CustomSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  items,
}: CustomSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Select name={field.name} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );

  // return (
  //   <div>
  //     <Label className="text-gray-700 pb-2">{label}</Label>
  //     <Select>
  //       <SelectTrigger className="w-full">
  //         <SelectValue placeholder={placeholder} />
  //       </SelectTrigger>
  //       <SelectContent>
  //         <SelectGroup>
  //           {items.map((item) => (
  //             <SelectItem key={item.value} value={item.value}>
  //               {item.name}
  //             </SelectItem>
  //           ))}
  //         </SelectGroup>
  //       </SelectContent>
  //     </Select>
  //   </div>
  // );
};
