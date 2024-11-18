import heapq


def dijkstra(graph, start):
    n = len(graph)  # количество вершин
    inf = float("inf")

    # Массивы для расстояний и предшественников
    l = [inf] * n
    ftr = [None] * n

    # Инициализация начальной вершины
    l[start] = 0
    Q = [(0, start)]  # очередь с приоритетом (расстояние, вершина)

    print(f"Инициализация: l = {l}, ftr = {ftr}")

    while Q:
        # Извлекаем вершину с минимальным расстоянием
        current_distance, i = heapq.heappop(Q)
        print(f"\nИзвлечена вершина {i} с расстоянием {current_distance}.")

        # Если расстояние больше, чем уже найденное, пропускаем
        if current_distance > l[i]:
            continue

        # Рассчитываем расстояния до соседей
        for j, weight in graph[i]:
            distance = current_distance + weight
            print(
                f"  Проверяем соседнюю вершину {j} с весом {weight}. Новое расстояние: {distance}"
            )

            # Если найдено более короткое расстояние
            if distance < l[j]:
                l[j] = distance
                ftr[j] = i  # запоминаем предшественника
                heapq.heappush(Q, (distance, j))  # добавляем в очередь
                print(f"  Обновляем: l[{j}] = {l[j]}, ftr[{j}] = {ftr[j]}")

        print(f"  Массивы после обработки вершины {i}: l = {l}, ftr = {ftr}")

    return l, ftr


# Пример использования
if __name__ == "__main__":
    # Граф в виде списка смежности: Г[i] = [(сосед, вес), ...]
    graph = {
        0: [(1, 1), (2, 4)],
        1: [(0, 1), (2, 2), (3, 5)],
        2: [(0, 4), (1, 2), (3, 1)],
        3: [(1, 5), (2, 1)],
    }

    start_vertex = 0
    l, ftr = dijkstra(graph, start_vertex)

    print("\nКонечные результаты:")
    print("Массив кратчайших расстояний (l):")
    print(l)

    print("\nМассив предшественников (ftr):")
    print(ftr)
