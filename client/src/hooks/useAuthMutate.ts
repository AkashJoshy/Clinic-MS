import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth/index";

interface UseMutateOptions<TData> {
  onSuccess?: (data: TData) => void;
}

export const useAuthMutate = <TData, TVariables>(
  service: (data: TVariables) => Promise<TData>,
  options?: UseMutateOptions<TData>,
) => {
  const { login, setLoading } = useAuthStore();
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: service,
    onSuccess: (data: any) => {
      setLoading(false);
      toast.success(data.message);
      if (data?.data?.accessToken) {
        login(data.data.accessToken, data.data.user, data.data.role);
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

  return { mutate, mutateAsync, isPending, setLoading };
};
