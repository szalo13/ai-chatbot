import {
  Button as MaterialButton,
  ButtonProps,
} from "@material-tailwind/react";

export const Button = MaterialButton;

export const PrimaryButton = (
  props: Partial<Omit<ButtonProps, "variant" | "color">>
) => {
  return <MaterialButton variant="filled" color="black" {...(props as any)} />;
};
