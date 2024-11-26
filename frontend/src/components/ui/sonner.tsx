import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner className="toaster group select-none" duration={3000} {...props} />
  );
};

export { Toaster };
