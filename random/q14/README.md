The graph colouring problem consists of assigning colours to the nodes of a graph. In this exercise we will use two colours (black and white) in such a way that any two adjacent nodes must have different colours. For the sake of simplicity, we will assume that all the graphs we are going to compute have a feasible solution.

The signature of your function should be:

```python
def solve(input: str) -> List[int]
```

You may implement other functions called by your `solve` function if you wish.

## Input Spec

The graph is represented by a string containing one tuple of items separated by a blank space per line.

The first line contains the number of nodes and edges respectively. The following lines contain the IDs of the nodes connected by an edge. These IDs go from `1` to `n`, where `n` is the number of nodes in the graph.

No self-loops are allowed, meaning that if there is a line in the given input that reads `a b` then  `a` and `b` are different nodes.

You can assume that the input will not have any formatting errors.

## Output Spec

The output must be a list of nodes to be coloured black in order to have a solution.

Keep in mind that there can be multiple solutions for the same graph. If this is the case, only one must be returned. You can assume that all incoming graphs will have a feasible solution.

## Sample Input & Output

Input:

```
6 7
1 2
1 3
2 4
2 5
3 4
4 6
5 6
```

This graph has 6 nodes and 7 edges (first line). Then we have an undirected graph where 1 is connected with 2, 1 with 3, 2 with 4. Because this is an undirected graph, a line in the graph `2 4` is equivalent to `4 2`. In any case, you should expect only one occurrence.

Output:

```
[1,4,5]
```

The output indicates that there is a solution setting nodes 1, 4, and 5 to black.