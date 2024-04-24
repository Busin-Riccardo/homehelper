import { useToast } from '@/components/ui/use-toast';

export function useDebugToast(): (value: unknown) => void {
  const { toast } = useToast();
  return value =>
    toast({ description: <pre>{JSON.stringify(value, null, 2)}</pre> });
}
