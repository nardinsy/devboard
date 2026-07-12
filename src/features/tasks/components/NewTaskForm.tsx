import { Controller, SubmitHandler } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import { useNewTaskForm } from '../hooks/useNewTaskForm';
import { ColumnStatus } from '@/features/board/types';
import { NewTaskFormData } from '../schemas';
import { LABEL_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from '../constants';

import { CustomTextField } from '@/components/CustomTextField';
import { DatePicker } from '@/components/DatePicker';
import { CustomSelect } from '@/components/CustomSelect';
import { useCreateTask } from '../hooks/useCreateTask';

interface NewTaskFormProps {
  boardId: string;
  status: ColumnStatus;
  onClose: () => void;
}
// TODO build CustomFormField

export const NewTaskForm = ({ boardId, status, onClose }: NewTaskFormProps) => {
  const form = useNewTaskForm({ boardId, status });
  const { mutate } = useCreateTask();

  const onSubmit: SubmitHandler<NewTaskFormData> = (values) => {
    mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <form id="form-rhf" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <CustomTextField
          control={form.control}
          name="title"
          label="Task Title"
          placeholder="Enter title"
        />
        <CustomTextField
          control={form.control}
          name="description"
          label="Task Description"
          placeholder="Enter description"
        />

        <Controller
          name="dueDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Due Date</FieldLabel>
              <DatePicker field={field} className="w-full" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <CustomSelect
          control={form.control}
          name="label"
          label="Label"
          placeholder="Select Label"
          items={LABEL_OPTIONS}
        />

        <CustomSelect
          control={form.control}
          name="priority"
          label="Priority"
          placeholder="Select Priority"
          items={PRIORITY_OPTIONS}
        />

        <CustomSelect
          control={form.control}
          name="status"
          label="Status"
          placeholder="Select Status"
          items={STATUS_OPTIONS}
        />
      </FieldGroup>

      {/* //TODO button style */}
      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" form="form-rhf">
          Create Task
        </Button>
      </Field>
    </form>
  );
};
