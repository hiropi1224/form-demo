import { Container, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Title>成功</Title>
      <Stack>
        <Link href="/conform">conformフォーム</Link>
        <Link href="/mantine">mantineフォーム</Link>
      </Stack>
    </Container>
  );
}
