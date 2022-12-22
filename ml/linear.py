from sklearn import linear_model
from sklearn.metrics import mean_squared_error as mse, r2_score
from data import get_data
from sklearn.model_selection import train_test_split


if __name__ == "__main__":
    # data
    x, y = get_data()
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3)
    # fit
    model = linear_model.LinearRegression()
    model.fit(x_train, y_train)
    # predict
    y_pred = model.predict(x_test)
    # eval
    print(f"Mean squared error: {mse(y_test, y_pred)}")
    print(f"Coefficient of determination (R2): {r2_score(y_test, y_pred)}")
