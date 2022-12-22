import math
import numpy as np
from sklearn.model_selection import RandomizedSearchCV
from data import get_data
from sklearn.base import BaseEstimator
import tensorflow as tf
import keras
from keras import layers
from keras.models import load_model
from sklearn.metrics import r2_score


LB = 200


class LSTMModel(BaseEstimator):
    def __init__(self, lr=0.01, batch_size=32, epochs=64,
                 activation="sigmoid", recurrent_activation="tanh") -> None:
        # hyperparameters
        self.lr = lr
        self.batch_size = batch_size
        self.epochs = epochs
        self.activation = activation
        self.recurrent_activation = recurrent_activation
        self.es = tf.keras.callbacks.EarlyStopping(
            monitor="loss", min_delta=0, patience=20, mode="auto", baseline=None, restore_best_weights=False)
        # model
        self.model = keras.Sequential([layers.LSTM(
            500, activation=self.activation, recurrent_activation=self.recurrent_activation), layers.Dense(1)])

    @staticmethod
    def pre_process(x, y, key="test"):
        LEN = y.shape[0]
        SPLIT = int(LEN * 0.7)

        X = []
        Y = []
        if key == "train":
            start = 0
            end = SPLIT
        elif key == "test":
            start = SPLIT
            end = LEN - LB
        else:
            start = 0
            end = LEN - LB

        for i in range(start, end):
            X.append(y["prediction"][i: i + LB].iloc[::-1])
            Y.append(y["prediction"][i])

        X = np.array(X, dtype=np.float32)
        Y = np.array(Y, dtype=np.float32)
        X = X.reshape(X.shape[0], X.shape[1], 1)
        Y = Y.reshape(Y.shape[0], 1, 1)
        return X, Y

    def fit(self, x, y):
        X, Y = LSTMModel.pre_process(x, y, key="train")
        opt = keras.optimizers.SGD(
            learning_rate=self.lr, momentum=0.9, clipnorm=1.0)
        self.model.compile(optimizer=opt, loss="mse")
        return self.model.fit(X, Y, batch_size=self.batch_size,
                              epochs=self.epochs, callbacks=[self.es])

    def predict(self, x):
        return self.model(x).numpy().flatten()

    def score(self, x, y):
        X, Y = LSTMModel.pre_process(x, y, key="test")
        return self.model.evaluate(X, Y, batch_size=self.batch_size)

    def get_params(self, deep=True):
        return {"epochs": self.epochs,
                "lr": self.lr,
                "batch_size": self.batch_size,
                "activation": self.activation,
                "recurrent_activation": self.recurrent_activation
                }

    def set_params(self, **params):
        return super().set_params(**params)

    def save_model(self):
        """
        Save the model
        """
        self.model.save('./modelpickle')

    def load_model(self):
        """
        Load the model
        """
        self.model = load_model('./modelpickle')


def hyper_search(x, y):
    clf = RandomizedSearchCV(
        LSTMModel(), {
            "epochs": [32, 64, 256],
            "lr": [math.pow(10, -1 * i) for i in range(2, 6)],
            "batch_size": [int(math.pow(2, i)) for i in range(3, 7)],
            "activation": ["tanh", "sigmoid"],
            "recurrent_activation": ["tanh", "sigmoid"]}, cv=5, verbose=2)
    clf.fit(x, y)
    print("--------------COMPLETED--------------")
    print(clf.best_params_)
    print(clf.best_score_)
    return clf.best_params_


if __name__ == "__main__":
    x, y = get_data()
    # bestparams = hyper_search(x, y)
    # model = LSTMModel(lr=bestparams["lr"], batch_size=bestparams["batch_size"],
    #                   epochs=bestparams["epochs"], activation=["activation"])
    model = LSTMModel()
    # history = model.fit(x, y)
    model.load_model()
    # predict
    x_test, y_test = LSTMModel.pre_process(x, y, key="test")
    y_pred = model.predict(x_test)
    x_time = []
    LEN = y.shape[0]
    for i in range(int(LEN * 0.7), LEN - LB):
        x_time.append(x["time"][i])
    # eval
    print(f"Score {model.score(x, y)}")
    print(
        f"Coefficient of determination (R2): {r2_score(y_test.flatten(), y_pred)}")
    model.save_model()
