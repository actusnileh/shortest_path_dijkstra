import { Container, Title, Paper } from "@mantine/core";

export const HomePage = () => {
    return (
        <Container style={{ textAlign: "center", padding: "2rem" }}>
            <Paper shadow="xl" radius="xl" p={"md"} bg={"#262626"}>
                <Title order={1} style={{ color: "#ecf0f1" }}>
                    Алгоритм Дейкстры
                </Title>
            </Paper>
        </Container>
    );
};
