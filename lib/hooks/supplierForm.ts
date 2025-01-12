import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  UseFormProps,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import { z } from "zod";

type UseZodFormProps<TSchema extends z.ZodType> = {
  schema: TSchema;
  defaultValues?: DefaultValues<z.infer<TSchema>>;
  /**
   * Additional zod resolver options
   * @see https://github.com/react-hook-form/resolvers#zodResolver
   */
  resolverOptions?: Parameters<typeof zodResolver>[1];
} & Omit<UseFormProps<z.infer<TSchema>>, "resolver" | "defaultValues">;

/**
 * A custom hook that combines react-hook-form with zod schema validation
 * @template TSchema - The zod schema type
 * @param props - The form configuration including schema, default values, and other react-hook-form options
 * @returns The react-hook-form methods and state
 */
export function useZodForm<TSchema extends z.ZodType>(
  props: UseZodFormProps<TSchema>
): UseFormReturn<z.infer<TSchema>> {
  const { schema, defaultValues, resolverOptions, ...formConfig } = props;

  return useForm<z.infer<TSchema>>({
    ...formConfig,
    defaultValues,
    resolver: zodResolver(schema, resolverOptions),
  });
}

/**
 * Type helper to infer the form data type from a zod schema
 * @template TSchema - The zod schema type
 */
export type InferFormData<TSchema extends z.ZodType> = z.infer<TSchema>;
