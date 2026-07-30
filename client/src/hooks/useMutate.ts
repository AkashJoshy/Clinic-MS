import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth/index";

interface UseMutateOptions<TData> {
  onSuccess?: (data: TData) => void;
}

export const useMutate = <TData, TVariables>(
  service: (data: TVariables) => Promise<TData>,
  options?: UseMutateOptions<TData>,
) => {
  const { setLoading } = useAuthStore();

  const { mutate, mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: service,
    onSuccess: (data: any) => {
      setLoading(false);

      if (!data?.silent) {
        toast.success(data?.message);
      }

      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error(error.message);
    },
    onMutate: () => {
      setLoading(true);
    },
  });

  return { mutate, mutateAsync, isPending, setLoading, isSuccess };
};
