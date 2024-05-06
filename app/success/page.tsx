import { Container, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Title>成功</Title>
      <Link href="/conform">conform</Link>
      <Link href="/mantine">mantine</Link>
    </Container>
  );
}
