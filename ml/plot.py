import matplotlib.pyplot as plt


def __plot__(x_test, y_test, y_pred, model_name):
    plt.scatter(x_test, y_test, color="black")
    plt.plot(x_test, y_pred, color="blue", linewidth=3)
    plt.title(f"NFT Price Prediction ({model_name}) [Test Data]")
    plt.legend(["Predicted", "Actual"], loc="upper right")
    plt.xlabel("Time (s)")
    plt.ylabel("Price (DCM)")


def show_plot(x_test, y_test, y_pred, model_name):
    __plot__(x_test, y_test, y_pred, model_name)
    plt.show()


def save_plot(x_test, y_test, y_pred, model_name, name="fig"):
    __plot__(x_test, y_test, y_pred, model_name)
    plt.savefig(name)


def __loss__(h):
    history = h.history["loss"]
    plt.title("Model Loss")
    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.legend(["train", "test"], loc="upper right")
    plt.plot(history)


def show_loss(history):
    __loss__(history)
    plt.show()


def save_loss(history, name="fig"):
    __loss__(history)
    plt.savefig(name)
