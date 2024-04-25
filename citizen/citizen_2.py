# implement Linear Regression from scratch
# Cost function = sum(1/m)(y_pred - y_true)**2 + lambda * theta**2
# gradient = 

import numpy as np

class LR:
    def __init__(self):
        self.learning_rate = 0.01
        self.n_iters = 100
        self.regularization = 0.01
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0
        running_loss = 0.0
        # grad discent
        for _ in range(self.n_iters):

            y_pred = np.dot(X, self.weights) + self.bias
            
            dw = (1 / n_samples) * (np.dot(X.T, (y_pred - y)) + self.regularization * self.weights)
            db = (1 / n_samples) * np.sum(y_pred - y)

            self.weights -= self.learning_rate * dw 
            self.bias -= self.learning_rate * db
    
    def predict(self, X):
        return np.dot(X, self.weights) + self.bias

    def evaluate(self, y_true, y_pred):
        return np.mean((y_true - y_pred) ** 2)

linear_reg = LR()
X = np.array([[0], [1], [2], [3], [4], [5]])
y = np.array([0, 1, 2, 3, 4, 5])

linear_reg.fit(X, y)

y_pred = linear_reg.predict(X)

print(y_pred)
print('MSE: ', linear_reg.evaluate(y, y_pred))


