from collections import Counter

def prime_factors(num):
  i = 2
  factors = []
  while i * i < = num:
    if (num % i):
      i += 1
    else:
      num //= i
      factors.append(i)
  if (num > 1):
    factors.append(num)
  return list(set(factors))

def flip_1(states, numbers):
  factors = []

  for num in numbers:
    factors.extend(prime_factors(num))

  facotrs = Counter(factors)

  for key, val in factors.items():
    if val % 2:
      for i in range(len(states)):
        if ((i + 1) % factor == 0):
          states[i] = 1 if states[i] == 0 else 0
    
  return states

# Return list `sf` such that sf[i] is the smallest prime
# factor of `i`, for 2 <= i <= maxn.
def sieve(maxn):
    from math import isqrt
    sf = list(range(maxn + 1))
    for i in range(4, len(sf), 2):
        sf[i] = 2
    for p in range(3, isqrt(maxn) + 1, 2):
        if sf[p] == p:
            for i in range(p * p, len(sf), p + p):
                if sf[i] == i:
                    sf[i] = p
    return sf

def sieve_primes(number):
    a = [True if n>=2 and n%2==1 or n==2 else False for n in range(number+1)];
    for x in range(3, (int)(math.sqrt(number))):
        if a[x]:
            for xx in range(x*x, number, x):
                a[xx] = False;
    primes = []
    for i in range(len(a)):
        if a[i]:
            primes.append(i);
    return primes;

def flip_1(states, numbers):
  factors = []

  for num in numbers:
    factors.extend(prime_factors(num)) #replace with factors.extend(sieve_primes(num)) or factors.extend(sieve(num))

  facotrs = Counter(factors)

  for key, val in factors.items():
    if val % 2:
      for i in range(key - 1, len(states), key):
        states[i] = 1 - states[i]

  return states




