import heapq


def dijkstra(graph, start_node):
    log = []  # Список для логирования шагов алгоритма

    num_nodes = len(graph)
    inf = float("inf")

    # Массивы для хранения кратчайших расстояний и предшественников
    shortest_distances = [inf] * num_nodes
    predecessors = [None] * num_nodes

    # Инициализация начальной вершины
    shortest_distances[start_node] = 0
    priority_queue = [(0, start_node)]  # Очередь с приоритетом (расстояние, вершина)

    log.append(f"🛠️ Инициализация: Начинаем с вершины {start_node}. Массивы:")
    log.append(f"  - Кратчайшие расстояния (shortest_distances): {shortest_distances}")
    log.append(f"  - Предшественники (predecessors): {predecessors}")

    while priority_queue:
        # Извлекаем вершину с минимальным расстоянием
        current_distance, current_node = heapq.heappop(priority_queue)
        log.append(
            f"🔍 Извлечена вершина {current_node} с расстоянием {current_distance}."
        )

        # Если найденное расстояние больше уже найденного, пропускаем
        if current_distance > shortest_distances[current_node]:
            log.append("  🚫 Это расстояние больше уже найденного, пропускаем.")
            continue

        # Рассчитываем расстояния до соседних вершин
        for neighbor, edge_weight in graph[current_node]:
            new_distance = current_distance + edge_weight
            log.append(
                f"  ➡️ Проверяем соседнюю вершину {neighbor} с весом {edge_weight}."
            )
            log.append(f"    - Новое расстояние до {neighbor}: {new_distance}")

            # Если найдено более короткое расстояние
            if new_distance < shortest_distances[neighbor]:
                shortest_distances[neighbor] = new_distance
                predecessors[neighbor] = current_node  # Запоминаем предшественника
                heapq.heappush(
                    priority_queue, (new_distance, neighbor)
                )  # Добавляем в очередь
                log.append(
                    f"    🔄 Обновляем: кратчайшее расстояние до {neighbor} = {new_distance}."
                )
                log.append(f"    Предшественник вершины {neighbor}: {current_node}")

        log.append(f"  📊 Массивы после обработки вершины {current_node}:")
        log.append(f"    - Кратчайшие расстояния: {shortest_distances}")
        log.append(f"    - Предшественники: {predecessors}")

    return shortest_distances, predecessors, log
