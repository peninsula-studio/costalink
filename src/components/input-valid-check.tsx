import { useQuery } from "@tanstack/react-query";
import { Check, XIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/useDebounce";

export function InputValidCheck({
  validCheckFn: isValidFn,
  ...props
}: React.ComponentProps<typeof InputGroupInput> & {
  validCheckFn: (value: string) => Promise<boolean>;
}) {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    if (props.value) {
      setValue(String(props.value));
    } else {
      setValue("");
    }
  }, [props.value]);

  const debouncedValue = useDebounce(value);

  const { data: isValid, isPending } = useQuery({
    queryKey: ["checkSlug", debouncedValue],
    queryFn: async () => await isValidFn(debouncedValue),
  });

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          // if (e.currentTarget.value.length > 0) isMounted.current = false;
          props.onChange?.(e);
        }}
      />
      {value.length > 0 && (
        <Badge
          className="h-full rounded-r-md rounded-l-none"
          variant={
            isPending === true || value !== debouncedValue
              ? "secondary"
              : isValid === false
                ? "destructive"
                : "default"
          }
        >
          {isPending === true || value !== debouncedValue ? (
            <>
              <Spinner /> Verificando
            </>
          ) : isValid === false ? (
            <>
              <XIcon /> Inválido
            </>
          ) : (
            <>
              <Check /> Válido
            </>
          )}
        </Badge>
      )}
    </InputGroup>
  );
}
