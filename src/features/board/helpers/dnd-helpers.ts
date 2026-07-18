import { UniqueIdentifier } from '@dnd-kit/core';
import { ColumnsData } from '../types';

export const findColumnId = (itemId: UniqueIdentifier, columns: ColumnsData[]) => {
  if (columns.some((col) => col.id === itemId)) {
    return itemId;
  }

  return columns.find((col) => col.tasks.some((task) => task.id === itemId))?.id;
};
