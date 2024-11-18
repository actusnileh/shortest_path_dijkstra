import React, { useState } from "react";
import {
    Container,
    Title,
    Paper,
    Button,
    Notification,
    Group,
    Table,
    TextInput,
    Stack,
} from "@mantine/core";
import axios from "axios";
import { Graph } from "react-d3-graph";

export const HomePage = () => {
    const [graph, setGraph] = useState([]);
    const [startVertex, setStartVertex] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const exampleGraph = [
        [
            [1, 2],
            [2, 7],
            [4, 6],
            [3, 4],
        ],
        [
            [2, 2],
            [4, 2],
            [3, 1],
        ],
        [],
        [
            [1, 2],
            [4, 1],
        ],
        [[2, 1]],
    ];

    const transformGraphData = () => {
        const nodes = [];
        const links = [];
        graph.forEach((edges, vertexIndex) => {
            nodes.push({ id: vertexIndex.toString() });
            edges.forEach((edge) => {
                const target = edge[0];
                if (target < graph.length) {
                    links.push({
                        source: vertexIndex.toString(),
                        target: target.toString(),
                        label: edge[1].toString(),
                    });
                }
            });
        });
        return { nodes, links };
    };

    const addVertex = () => {
        setGraph([...graph, []]);
    };

    const removeVertex = (index) => {
        const newGraph = [...graph];
        newGraph.splice(index, 1);
        setGraph(newGraph);
    };

    const addEdge = (vertexIndex) => {
        const newGraph = [...graph];
        newGraph[vertexIndex].push([0, 0]);
        setGraph(newGraph);
    };

    const removeEdge = (vertexIndex, edgeIndex) => {
        const newGraph = [...graph];
        newGraph[vertexIndex].splice(edgeIndex, 1);
        setGraph(newGraph);
    };

    const handleEdgeChange = (vertexIndex, edgeIndex, field, value) => {
        const newGraph = [...graph];
        if (field === "vertex") {
            newGraph[vertexIndex][edgeIndex][0] = parseInt(value, 10);
        } else if (field === "weight") {
            newGraph[vertexIndex][edgeIndex][1] = parseInt(value, 10);
        }
        setGraph(newGraph);
    };

    const setExampleGraph = () => {
        setGraph(exampleGraph);
    };

    const handleSolve = async () => {
        setError(null);
        setResult(null);

        try {
            const start = parseInt(startVertex, 10);

            if (!Array.isArray(graph)) {
                throw new Error("Граф должен быть массивом списков смежности.");
            }
            if (isNaN(start) || start < 0 || start >= graph.length) {
                throw new Error("Некорректный номер начальной вершины.");
            }

            const response = await axios.post("http://0.0.0.0:8000/dijkstra/", {
                graph,
                start,
            });

            setResult(response.data);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                    err.message ||
                    "Произошла ошибка. Проверьте ввод данных."
            );
        }
    };

    const graphData = transformGraphData();

    const graphConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "#1d3557",
            size: 1000,
            highlightStrokeColor: "#FF4F58",
            labelProperty: "id",
            fontSize: 26,
            fontColor: "#F1F1F1",
            labelPosition: "center",
        },
        link: {
            color: "#7F8C8D",
            highlightColor: "#FF4F58",
            renderLabel: true,
            fontSize: 20,
            fontColor: "#F1F1F1",
        },
        d3: {
            linkLength: 120,
            gravity: -300,
        },
        height: 500,
        width: 800,
    };

    return (
        <Container style={{ textAlign: "center", padding: "2rem" }}>
            <Paper shadow="xl" radius="xl" p={"md"} bg={"#262626"}>
                <Title order={1} style={{ color: "#ecf0f1" }}>
                    Алгоритм Дейкстры
                </Title>
            </Paper>

            <Paper
                shadow="xl"
                radius="xl"
                p={"md"}
                style={{ marginTop: "2rem" }}
            >
                <Stack align="center">
                    <Group>
                        <Button onClick={addVertex}>Добавить вершину</Button>
                        <Button onClick={setExampleGraph}>Пример</Button>{" "}
                    </Group>

                    {graph.map((edges, vertexIndex) => (
                        <Paper
                            key={vertexIndex}
                            p={"sm"}
                            style={{ marginTop: "1rem" }}
                        >
                            <Group position="apart">
                                <Title order={3} style={{ color: "#ecf0f1" }}>
                                    Вершина {vertexIndex}
                                </Title>
                                <Button
                                    onClick={() => removeVertex(vertexIndex)}
                                    variant="outline"
                                    color="red"
                                >
                                    X
                                </Button>
                            </Group>

                            <Group
                                position="left"
                                spacing="xs"
                                style={{ marginTop: "1rem" }}
                            >
                                {edges.map((edge, edgeIndex) => (
                                    <Group key={edgeIndex}>
                                        <TextInput
                                            placeholder="Вершина"
                                            value={edge[0]}
                                            onChange={(e) =>
                                                handleEdgeChange(
                                                    vertexIndex,
                                                    edgeIndex,
                                                    "vertex",
                                                    e.target.value
                                                )
                                            }
                                            style={{ width: "150px" }}
                                        />
                                        <TextInput
                                            placeholder="Вес"
                                            value={edge[1]}
                                            onChange={(e) =>
                                                handleEdgeChange(
                                                    vertexIndex,
                                                    edgeIndex,
                                                    "weight",
                                                    e.target.value
                                                )
                                            }
                                            style={{ width: "100px" }}
                                        />
                                        <Button
                                            variant="outline"
                                            color="red"
                                            onClick={() =>
                                                removeEdge(
                                                    vertexIndex,
                                                    edgeIndex
                                                )
                                            }
                                        >
                                            Удалить ребро
                                        </Button>
                                    </Group>
                                ))}
                            </Group>

                            <Button
                                onClick={() => addEdge(vertexIndex)}
                                variant="light"
                                color="blue"
                                style={{ marginTop: "1rem" }}
                            >
                                Добавить ребро
                            </Button>
                        </Paper>
                    ))}
                </Stack>

                <TextInput
                    placeholder="Введите начальную вершину, например: 0"
                    value={startVertex}
                    onChange={(e) => setStartVertex(e.target.value)}
                    label="Начальная вершина"
                    style={{ marginTop: "1rem" }}
                />

                <Button
                    onClick={handleSolve}
                    variant="light"
                    color="blue"
                    style={{ marginTop: "1rem" }}
                >
                    Решить
                </Button>
            </Paper>

            {error && (
                <Notification color="red" style={{ marginTop: "1rem" }}>
                    {typeof error === "string" ? error : JSON.stringify(error)}
                </Notification>
            )}

            {result && (
                <Paper
                    shadow="xl"
                    radius="xl"
                    p={"md"}
                    style={{ marginTop: "2rem" }}
                >
                    <Title order={2}>Результаты</Title>
                    <Table withColumnBorders withRowBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Вершина</Table.Th>
                                <Table.Th>Расстояние</Table.Th>
                                <Table.Th>Предшественник</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {result.distances &&
                                Array.isArray(result.distances) &&
                                result.distances.map((distance, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{index}</Table.Td>
                                        <Table.Td>
                                            {distance === null ? "∞" : distance}
                                        </Table.Td>
                                        <Table.Td>
                                            {result.predecessors &&
                                            Array.isArray(
                                                result.predecessors
                                            ) &&
                                            result.predecessors[index] === null
                                                ? "-"
                                                : result.predecessors[index]}
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            )}

            <div style={{ marginTop: "2rem" }}>
                <Graph id="graph-id" data={graphData} config={graphConfig} />
            </div>
        </Container>
    );
};
