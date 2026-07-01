import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ColumnStatus, Task } from '../types';
import { BoardColumn } from './BoardColumn';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useUpdateColumnOrder } from '../hooks/useUpdateColumnOrder';
import { TaskOverLay } from '@/features/tasks/components/TaskOverLay';

interface ColumnsData {
  id: UniqueIdentifier;
  status: ColumnStatus;
  tasks: Task[];
}

export const BoardColumns = ({
  columnsData,
  isLoading,
}: {
  columnsData: ColumnsData[];
  isLoading: boolean;
}) => {
  const [columns, setColumns] = useState<ColumnsData[]>(columnsData);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const { mutate } = useUpdateColumnOrder('board-1');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateColumns = (updates: { status: ColumnStatus; taskIds: string[] }[]) => {
    mutate(updates, {
      onError: () => {
        setColumns(columnsData);
        // toast notification
      },
    });
  };

  const findColumnId = (itemId: UniqueIdentifier) => {
    if (columns.some((col) => col.id === itemId)) {
      return itemId;
    }

    return columns.find((col) => col.tasks.some((task) => task.id === itemId))?.id;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumnId = findColumnId(activeId);
    const overColumnId = findColumnId(overId);

    if (!activeColumnId || !overColumnId) return;

    // handled in drag-end event
    if (activeColumnId === overColumnId && activeId !== overId) return;

    if (activeColumnId === overColumnId) return;

    // activeColumnId !== overColumnId
    setColumns((prev) => {
      const activeColumn = prev.find((col) => col.id === activeColumnId);
      if (!activeColumn) return prev;

      const activeTask = activeColumn.tasks.find((task) => task.id === activeId);
      if (!activeTask) return prev;

      const newColumns = prev.map((column) => {
        if (column.id === activeColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeId),
          };
        }

        if (column.id === overColumnId) {
          if (overId === overColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, activeTask],
            };
          }

          const overTaskIndex = column.tasks.findIndex((task) => task.id === overId);
          if (overTaskIndex !== -1) {
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, overTaskIndex + 1),
                activeTask,
                ...column.tasks.slice(overTaskIndex + 1),
              ],
            };
          }
        }

        return column;
      });

      return newColumns;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeColumnId = findColumnId(activeId);
    const overColumnId = findColumnId(overId);

    if (!activeColumnId || !overColumnId) {
      setActiveId(null);
      return;
    }

    if (activeColumnId === overColumnId && activeId !== overId) {
      const columnIndex = columns.findIndex((col) => col.id === activeColumnId);

      if (columnIndex === -1) {
        setActiveId(null);
        return;
      }

      const column = columns[columnIndex];
      const activeIndex = column.tasks.findIndex((task) => task.id === activeId);
      const overIndex = column.tasks.findIndex((task) => task.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newTasks = arrayMove(column.tasks, activeIndex, overIndex);

        setColumns((prev) => {
          return prev.map((column, i) => {
            if (i === columnIndex) {
              return { ...column, tasks: newTasks };
            }
            return column;
          });
        });

        updateColumns([
          { status: overColumnId as ColumnStatus, taskIds: newTasks.map((task) => task.id) },
        ]);
      }
    }

    if (activeColumnId !== overColumnId && overId) {
      const sourceCol = columns.find((col) => col.status === activeColumnId);
      const destCol = columns.find((col) => col.status === overColumnId);

      if (!sourceCol || !destCol) return;
      updateColumns([
        {
          status: activeColumnId as ColumnStatus,
          taskIds: sourceCol.tasks.map((task) => task.id),
        },
        {
          status: overColumnId as ColumnStatus,
          taskIds: destCol.tasks.map((task) => task.id),
        },
      ]);
    }
    setActiveId(null);
  };

  const activeTask = activeId
    ? columns.flatMap((col) => col.tasks).find((task) => task.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {columns.map((column) => (
        <BoardColumn
          key={column.id}
          id={column.id}
          status={column.status}
          tasks={column.tasks}
          isLoading={isLoading}
        />
      ))}

      <DragOverlay
        dropAnimation={{
          duration: 150,
        }}
      >
        {activeTask ? <TaskOverLay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
