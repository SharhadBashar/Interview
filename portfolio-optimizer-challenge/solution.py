import datetime
import typing as t

import numpy as np
import numpy.typing as npt
import pandas as pd
import scipy as sp  # type: ignore[import-untyped]
import tqdm

FloatArray = npt.NDArray[np.float_]

RISK_TOLERANCE = 500
DAILY_VOLUME_LIMIT = 100


def compute_expected_spread(price_df: pd.DataFrame) -> pd.DataFrame:
    """
    Compute the expected spread for each node and hour for the operating day, by taking the mean of observed
    spread values available as of 24 hours prior to the beginning of the operating day.

    :param price_df: historical price data [operating_day, hour_beginning, node, da_price, rt_price]
    :return: data frame of expected spread values [operating_day, hour_beginning, node, expected_dart_spread]
    """
    raise NotImplementedError


def compute_spread_variance(price_df: pd.DataFrame) -> pd.DataFrame:
    """
    Compute the estimated spread variance for each node and hour for the operating day, by taking the sample variance
    of observed spread values available as of 24 hours prior to the beginning of the operating day.

    :param price_df: historical price data [operating_day, hour_beginning, node, da_price, rt_price]
    :return: data frame of estimated spread variance values [operating_day, hour_beginning, node, dart_spread_var]
    """
    raise NotImplementedError


def get_daily_expected_spread_vectors(expected_spread_df: pd.DataFrame) -> pd.DataFrame:
    """
    Transform the expected spread data frame into a data frame with one row per operating day, where the index is
    the operating day and the elements of each row are the expected spread values for all node and hour combinations
    on that day.

    :param expected_spread_df: data frame of expected spread values
        [operating_day, hour_beginning, node, expected_dart_spread]
    :return: data frame of expected spread vectors with operating day as index
    """
    raise NotImplementedError


def get_daily_spread_variance_vectors(spread_var_df: pd.DataFrame) -> pd.DataFrame:
    """
    Transform the spread variance data frame into a data frame with one row per operating day, where the index is
    the operating day and the elements of each row are the estimated spread variance values for all node and hour
    combinations on that day (i.e. the diagonal entries of the covariance matrix).

    :param spread_var_df: data frame of expected spread values
        [operating_day, hour_beginning, node, dart_spread_var]
    :return: data frame of expected spread vectors with operating day as index
    """
    raise NotImplementedError


def portfolio_objective_fn(
    bid_mw: FloatArray,
    expected_spread: FloatArray,
    spread_variance: FloatArray,
) -> float:
    """
    The objective function to minimize in the portfolio optimizer. This should also use the RISK_TOLERANCE constant
    defined above.

    :param bid_mw: array containing the bid quantities (in MW) for the daily portfolio
    :param expected_spread: array containing the expected spread values for the day
    :param spread_variance: array containing the estimated spread variance values for the day (i.e. the diagonal
        entries of the covariance matrix)
    :return: objective function value to minimize
    """
    raise NotImplementedError


def mw_constraint_fn(bid_mw: FloatArray, max_total_mw: float) -> float:
    """
    The constraint function which must take a non-negative value if and only if the constraint is satisfied.

    :param bid_mw: array containing the bid quantities (in MW) for the daily portfolio
    :param max_total_mw: the maximum number of total MW that can be traded in a day
    :return: constraint function value which must be non-negative iff the constraint is satisfied
    """
    raise NotImplementedError


def get_bids_from_daily_portfolios(portfolio_df: pd.DataFrame) -> pd.DataFrame:
    """
    Transform a data frame of daily portfolios to a data frame of bids. Also removes any bids smaller than 0.1 MW.

    :param portfolio_df: data frame of daily bid quantities with operating day as the index
    :return: data frame of bids [operating_day, hour_beginning, node, bid_type, bid_mw]
    """
    raise NotImplementedError


def compute_total_pnl(price_df: pd.DataFrame, bid_df: pd.DataFrame) -> float:
    """
    Compute the total PnL over all operating days in the bid data frame

    :param price_df: historical price data [operating_day, hour_beginning, node, da_price, rt_price]
    :param bid_df: data frame of bids [operating_day, hour_beginning, node, bid_type, bid_mw]
    :return: the total PnL
    """
    raise NotImplementedError


def generate_daily_bids(
    price_df: pd.DataFrame,
    first_operating_day: t.Union[str, datetime.date],
    last_operating_day: t.Union[str, datetime.date],
) -> pd.DataFrame:
    """
    Generate bids for the date range, computing the expected DART spreads and estimated variances from
    the price data and limiting each daily portfolio to a maximum size in MW.

    :param price_df: historical price data [operating_day, hour_beginning, node, da_price, rt_price]
    :param first_operating_day: first operating day for which to generate bids
    :param last_operating_day: last operating day for which to generate bids
    :return: data frame of bids [operating_day, hour_beginning, node, bid_type, bid_mw]
    """
    expected_spread = compute_expected_spread(price_df)
    spread_variance = compute_spread_variance(price_df)

    daily_expected_spread = get_daily_expected_spread_vectors(expected_spread)
    daily_spread_variance = get_daily_spread_variance_vectors(spread_variance)

    portfolios = []
    for day in tqdm.tqdm(pd.date_range(first_operating_day, last_operating_day)):
        result = sp.optimize.minimize(
            portfolio_objective_fn,
            np.zeros(len(daily_expected_spread.columns)),
            args=(daily_expected_spread.loc[day].values, daily_spread_variance.loc[day].values),
            constraints={
                "type": "ineq",
                "fun": mw_constraint_fn,
                "args": [DAILY_VOLUME_LIMIT],
            },
        )
        portfolios.append(
            pd.DataFrame(
                result.x[None, :],
                columns=daily_expected_spread.columns,
                index=pd.Index([day], name="operating_day")
            )
        )

    return get_bids_from_daily_portfolios(pd.concat(portfolios))


def load_price_data(path: str) -> pd.DataFrame:
    """
    Load historical price data

    :param path: path to a CSV of the price data
    :return: data frame of historical prices [operating_day, hour_beginning, node, da_price, rt_price]
    """
    return pd.read_csv(path, parse_dates=["operating_day"])


if __name__ == "__main__":
    price_df = load_price_data("prices.csv")

    print(f"Generating bids for 2022 with daily limit of 100 MW...")
    bid_df = generate_daily_bids(price_df, "2022-01-01", "2022-12-31")
    pnl = compute_total_pnl(price_df, bid_df)

    bid_df.to_csv("bids.csv", index=False)
    print(f"The strategy made ${pnl:.2f}")
