import { cls } from "@utils/cls";
import { forwardRef } from "react"

const classes = {
  base: 'focus:outline-none trasition ease-in-out duration-300 rounded-md',
  relative: "relative",
  absolute: "absolute -top-2 -right-2 -z-10",
  shadow: {
    primary: "shadow-xl shadow-primary/80",
    secondary: "shadow-xl shadow-secondary/80",
    white: "shadow-xl shadow-dark/20"
  },
  ani: "hover:top-0 hover:right-0",
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
const Box = forwardRef(({
  children,
  className,
  shadow = "white",
  variant = "primary",
  variantBack = "secondary",
  size = "md",
  ani = true,
  pill,
  absolute = true,
  relative = true,
  disabled = false,
  grid,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cls(`
      ${classes.base}
      ${classes.shadow[shadow]}
      ${classes.size[size]}
      ${classes.variant[variant]}
      ${relative && classes.relative}
      ${ani && classes.ani}
      ${className}
    `)}
    {...props}
  >
    <div className={cls(`${grid}`)}>
      {children}
    </div>
    {
      absolute ?
        <button
          ref={ref}
          className={
            cls(`
      ${classes.base}
      ${classes.shadow[shadow]}
      ${classes.size[size]}
      ${classes.variantBack[variantBack]}
      ${absolute && classes.absolute}
      ${ani && classes.ani}
      ${className}
 `)}
          {...props}
        >
        </button> : null
    }

  </div>
))

export default Box;
