import math
import numpy as np
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from data import get_data
from sklearn.base import BaseEstimator
import tensorflow as tf
import keras
from keras import layers
from sklearn.metrics import r2_score


class RegressionModel(BaseEstimator):
    def __init__(self, lr=0.01, batch_size=64, epochs=32) -> None:
        # hyperparameters
        self.lr = lr
        self.batch_size = batch_size
        self.epochs = epochs
        self.es = tf.keras.callbacks.EarlyStopping(
            monitor="loss", min_delta=0, patience=20, mode="auto", baseline=None, restore_best_weights=False)
        self.model = keras.Sequential([
            layers.Dense(3, activation="relu", name="input"),
            layers.Dense(5, activation="relu", name="hidden_layer_1"),
            # layers.Dense(7, activation="relu", name="hidden_layer_2"),
            layers.Dense(5, activation="relu", name="hidden_layer_3"),
            layers.Dense(1, name="output")])

    @staticmethod
    def pre_process(x, y, train=False):
        x_train, x_test, y_train, y_test = train_test_split(
            x, y, test_size=0.3)
        if train:
            return x_train, y_train
        else:
            return x_test, y_test

    # @Override
    def fit(self, x, y):
        X, Y = RegressionModel.pre_process(x, y, True)
        # opt = keras.optimizers.Adam(learning_rate=self.lr)
        opt = keras.optimizers.SGD(
            learning_rate=self.lr, momentum=0.9, clipnorm=1.0)
        self.model.compile(optimizer=opt, loss="mse")
        return self.model.fit(
            X,
            Y,
            batch_size=self.batch_size,
            epochs=self.epochs,
            callbacks=[self.es])

    def predict(self, x):
        return self.model(np.array([x])).numpy().flatten()

    # @Override
    def score(self, x, y):
        X, Y = RegressionModel.pre_process(x, y, False)
        return self.model.evaluate(X, Y, batch_size=self.batch_size)

    # @Override
    def get_params(self, deep=True):
        return {"epochs": self.epochs,
                "lr": self.lr,
                "batch_size": self.batch_size,
                }

    # @Override
    def set_params(self, **params):
        return super().set_params(**params)


def hyper_search(x, y):
    # clf = GridSearchCV(RegressionModel(), {"epochs": [32, 64, 256], "lr": [math.pow(
    # 10, -1 * i) for i in range(2, 6)], "batch_size": [int(math.pow(2, i))
    # for i in range(3, 7)]}, cv=5, verbose=2)
    clf = RandomizedSearchCV(RegressionModel(), {"epochs": [32, 64, 256], "lr": [math.pow(
        10, -1 * i) for i in range(2, 6)], "batch_size": [int(math.pow(2, i)) for i in range(3, 7)]}, cv=5, verbose=2)
    clf.fit(x, y)
    print("--------------COMPLETED--------------")
    print(clf.best_params_)
    print(clf.best_score_)
    return clf.best_params_


if __name__ == "__main__":
    x, y = get_data()
    # bestparams = hyper_search(x, y)
    # model = RegressionModel(
    #     lr=bestparams["lr"],
    #     batch_size=bestparams["batch_size"],
    #     epochs=bestparams["epochs"])
    model = RegressionModel()
    history = model.fit(x, y)
    # plot
    x_test, y_test = RegressionModel.pre_process(x, y, train=False)
    y_pred = model.predict(x_test)
    # eval
    print(f"Score {model.score(x, y)}")
    print(f"Coefficient of determination (R2): {r2_score(y_test, y_pred)}")
