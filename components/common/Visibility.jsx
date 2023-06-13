export default function Visibility({
  visibility = true,
  children
}) {
  return visibility ? children : null;
}
