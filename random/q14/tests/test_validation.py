from textwrap import dedent
from typing import List

import pytest

from q14 import solve

WHITE = False
BLACK = True

# List of test cases in the form (input, [valid_outputs])
TEST_CASES = [
    (
        dedent(
            """\
            6 6
            1 2
            1 3
            2 4
            2 5
            3 4
            4 6
            """
        ),
        [[1, 4, 5], [2, 3, 6]],
    ),
    (
        dedent(
            """\
            3 2
            1 2
            2 3
            """
        ),
        [[1, 3], [2]],
    ),
]


@pytest.mark.parametrize("input,valid_outputs", TEST_CASES)
def test_solver(input, valid_outputs: List[List[int]]):
    assert sorted(solve(input)) in valid_outputs
