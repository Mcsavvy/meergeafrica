import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type UseZodFormProps<T extends z.Schema> = {
  schema: T;
  options?: Parameters<typeof zodResolver>[1];
} & Omit<Parameters<typeof useForm<T>>, "resolver">[1];

export const useZodForm = <T extends z.Schema>({
  schema,
  options: schemaOptions,
  ...formOptions
}: UseZodFormProps<T>) => {
  if (!schema) {
    throw new Error("useZodForm requires a schema");
  }
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema, schemaOptions),
    ...formOptions,
  });
};
