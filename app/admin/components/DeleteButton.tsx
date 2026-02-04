"use client";

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useTransition } from 'react';

interface DeleteButtonProps {
  id: number;
  action: (id: number) => Promise<void>;
  itemName: string;
}

export function DeleteButton({ id, action, itemName }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${itemName}?`)) {
      startTransition(async () => {
        await action(id);
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive  hover:bg-primary"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
