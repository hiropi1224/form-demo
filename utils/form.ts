import { toast } from "sonner";

/**
 * @see https://www.robinwieruch.de/react-server-actions-toast-useactionstate/
 */
type Callbacks<T, R = unknown> = {
  onStart?: () => R;
  onEnd?: (reference: R) => void;
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};

export type ActionState = {
  status: "SUCCESS" | "ERROR";
  // biome-ignore lint/suspicious/noExplicitAny:
  data: any;
  // biome-ignore lint/suspicious/noExplicitAny:
  error: any;
  message?: string;
};

export const withCallbacks = <
  Args extends unknown[],
  T extends ActionState,
  R = unknown,
>(
  fn: (...args: Args) => Promise<T>,
  callbacks: Callbacks<T, R>,
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const reference = callbacks.onStart?.();

    const result = await promise;

    if (reference) {
      callbacks.onEnd?.(reference);
    }

    if (result?.status === "SUCCESS") {
      callbacks.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks.onError?.(result);
    }

    return promise;
  };
};

export type CreateToastCallbacksOptions = { loadingMessage?: string };

export const createToastCallbacks = (options: CreateToastCallbacksOptions) => {
  return {
    onStart: () => {
      return toast.loading(options.loadingMessage || "Loading ...");
    },
    onEnd: (reference: string | number) => {
      toast.dismiss(reference);
    },
    onSuccess: (result: ActionState) => {
      if (result?.message) {
        toast.success(result.message);
      }
    },
    onError: (result: ActionState) => {
      if (result?.message) {
        toast.error(result.message);
      }
    },
  };
};
