#!/usr/bin/env python3

import codecs
import string
import sys
import time

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.hashes import SHA1
from cryptography.hazmat.primitives.twofactor.totp import TOTP


ONE_WEEK_IN_SECONDS = 604_800


def generate_secret():
    totp = TOTP(
        key=codecs.encode(string.ascii_letters, encoding="utf-8"),
        length=8,
        algorithm=SHA1(),
        time_step=ONE_WEEK_IN_SECONDS,
        backend=default_backend(),
    )
    seed = int(time.time())
    token = codecs.decode(totp.generate(seed), encoding="utf-8")
    return f"{token}-{seed}"


# there are 2 small bugs below you'll have to fix before proceeding :)
if __name__ == "__main__":
  print(generate_secret())
  # sys.stdout.write(
  #     f"Please go to https://ramp.com/careers and use this secret when "
  #     f"you apply: {generate_secret()}\n"
  # )




  #
# Your previous Java content is preserved below:
#
# /*
#  * Click `Run` to execute the snippet below!
#  // m * n
# // 0 - No building
# // 1 - Not infected
# // 2 - Infected
# // grid = [[2,1,1],
# //         [1,1,0],
# //         [0,1,1]]
# // grid = [[2,0],
# //         [1,1]]
# // grid = [[2,1,1],
# //         [1,1,0],
# //         [0,0,1]]
#
# //
# // # of day = 4
# // return -1 if not able to infect all builidings
#  */

grid = [[2,1,1],
        [1,1,0],
        [0,0,1]]

def find_initial_infected(grid):
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 2:
                return [i, j]

def find_uninfected(grid, count_days):
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == 1:
                return -1

    return count_days - 1

def min_days(grid):
    m = len(grid)
    n = len(grid[0])
    index = []
    index.append(find_initial_infected(grid)) # [(0, 0)]


    count_days = 0
    while(index):
        to_append = []
        while(index):
            x, y = index.pop()
            if (y > 0):
                up = grid[x][y - 1]
                if (up == 1):
                    grid[x][y - 1] = 2
                    to_append.append([x, y - 1])
            if (y < n - 1):
                down = grid[x][y + 1]
                if (down == 1):
                    grid[x][y + 1] = 2
                    to_append.append([x, y + 1])
            if (x > 0):
                left = grid[x - 1][y]
                if (left == 1):
                    grid[x - 1][y] = 2
                    to_append.append([x - 1, y])
            if (x < m - 1):
                right = grid[x + 1][y]
                if (right == 1):
                    grid[x + 1][y] = 2
                    to_append.append([x + 1, y])


            #to_append.append([x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y])
        count_days += 1
        index.extend(to_append)


    print(find_uninfected(grid, count_days))

min_days(grid)
