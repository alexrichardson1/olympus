import pandas as pd
from keras.models import load_model


if __name__ == "__main__":
    model = load_model("./modelpickle")
    data = pd.read_csv("data.csv")
    x, _ = model.pre_process([], data, key="full")
    ys = model.predict(x)
    y = ys[-1]
    ids = pd.read_csv("prices.csv")
    ids["price"] = y
    ids.to_csv("prices.csv")
