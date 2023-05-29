import { clsV2 } from "@utils/cls";
import { forwardRef } from "react"

const classes = {
  base: 'focus:outline-none trasition ease-in-out duration-300 rounded-md border-none',
  ani: "hover:border-gray-100",
  disabled: "opacity-50 cursor-not-allowed",
  relative: "relative",
  absolute: "absolute -top-2 -right-2 -z-10",
  type: "button",
  size: {
    sm: 'px-2 py-0.5 text-sm border-2 border-dark',
    md: 'px-4 py-1 border-2 border-dark',
    lg: 'px-8 py-3 text-lg border-4 border-dark',
  },
  variant: {
    primary: "bg-primary",
    secondary: "bg-secondary",
    white: "bg-white",
  },
  variantBack: {
    primary: "bg-primary",
    secondary: "bg-secondary",
    white: "bg-white"
  }
}

const ButtonV2 = forwardRef(({
  children,
  className,
  variant = "primary",
  ani = true,
  variantBack = "secondary",
  size = "md",
  pill,
  type = "button",
  absolute = true,
  relative = true,
  disabled = false,
  grid,
  ...props
}, ref) => (
  <button
    ref={ref}
    className={
      clsV2(
        classes.base,
        classes.type,
        classes.size[size],
        classes.variant[variant],
        relative && classes.relative,
        ani && classes.ani,
        disabled && classes.disabled,
        className
      )
    }
    {...props}
  >
    {children}
    {absolute ?
      <div
        ref={ref}
        className={
          clsV2(
            classes.base,
            classes.type,
            classes.size[size],
            classes.variantBack[variantBack],
            absolute && classes.absolute,
            ani && classes.ani,
            className
            )
          }
        {...props}
      >
      </div> : null}
  </button>
))

export default ButtonV2;
