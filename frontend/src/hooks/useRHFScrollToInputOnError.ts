import { useEffect } from 'react';

interface Props {
  errors: any, 
  setFocus: (arg: any) => void
  isSubmitting: boolean,
}

export default function useRHFScrollToInputOnError({ errors, setFocus, isSubmitting }: Props) {
  useEffect(() => {
    const firstError = (Object.keys(errors) as Array<keyof typeof errors>).reduce<
      keyof typeof errors | null
    >((field, a) => {
      const fieldKey = field as keyof typeof errors;
      return !!errors[fieldKey] ? fieldKey : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, isSubmitting, setFocus]);
}
