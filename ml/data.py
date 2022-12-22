"""
Generate synthetic data
"""
from random import gauss
from random import randint
from random import seed
import csv
from time import time
import pandas as pd

seed(1)

CURRENT_PRICE = 500
ONE_DAY = 86400
ONE_WEEK = 604800
ONE_MONTH = 2.628e+6


def random_range(p):
    change = int(p * 0.1)
    return randint(p - change, p + change)


def random_label():
    return randint(0, 2)


def random_strength():
    return randint(0, 100)


def change_price(t, price, is_pump):
    data = []
    for _ in range(10):
        data.append(
            [t, random_label(), random_strength(), random_range(price)])
    ps = [p for [_, _, _, p] in data]
    if is_pump:
        new_price = max(ps)
    else:
        new_price = min(ps)
    return data, new_price


def generate_data():
    data = []
    t = int(time())
    price = CURRENT_PRICE
    FINISH = t - ONE_MONTH * 10

    while t > FINISH:
        change = int(price * 0.2)
        if randint(0, 9) < 5:
            new_data, new_price = change_price(t, price + change, True)
        else:
            new_data, new_price = change_price(t, price - change, False)
        data += new_data
        price = new_price
        t -= ONE_DAY
    return data


def write():
    header = ["time", "trait", "strength", "prediction"]
    data = generate_data()
    with open("data.csv", "w") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        for row in data:
            writer.writerow(row)


def get_data():
    data = pd.read_csv("data.csv")
    output_label = "prediction"
    x = data.loc[:, data.columns != output_label]
    y = data.loc[:, [output_label]]
    return x, y


if __name__ == "__main__":
    write()
