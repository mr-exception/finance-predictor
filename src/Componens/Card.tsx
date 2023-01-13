import MCard, { CardProps } from "@mui/material/Card";

export default function Card(props: CardProps) {
  return <MCard {...props} style={{ ...props.style, padding: 14 }} />;
}
