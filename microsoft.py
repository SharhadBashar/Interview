from collections import Counter


def coin_change(amount, coins = [1, 5, 10, 25]):
    if amount <= 0:
        return -1


    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    total_coins = dp[amount] if dp[amount] != float('inf') else -1 
    total_coins_return = total_coins

    change = {}
    for coin in coins:
        change[coin] = 0

    if (total_coins != -1):
        coins.sort(reverse = True)
        i = 0
        while(amount >= 0 and total_coins >= 0 and i < len(coins)):
            if (amount >= coins[i]):
                change[coins[i]] += 1
                amount -= coins[i]
                total_coins -= 1
            else:
                i += 1
            
    return [total_coins_return , Counter(change)]

print(coin_change(74))