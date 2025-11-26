export default function Callout({ variant = 'info', title, children }) {
  const classes = {
    info: 'callout callout-info',
    success: 'callout callout-success',
    warning: 'callout callout-warning',
  }
  return (
    <div className={classes[variant] || classes.info}>
      {title && <h6 className="mb-2">{title}</h6>}
      <div>{children}</div>
    </div>
  )
}
