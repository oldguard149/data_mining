import sys
import numpy as np
import joblib

fillNaNValues = [7, 2, 3, 3, 2, 4, 4, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 3, 2, 2, 4, 4, 2, 2, 2, 3, 2, 4, 5, 2, 2, 2, 2, 2, 3]
raw_x = []
# read input
for i in range(1, len(sys.argv)):
    raw_x.append(sys.argv[i])

# process input: fill missing value and convert datatype to int
for i, v in enumerate(raw_x):
    if v == '?':
        raw_x[i] = fillNaNValues[i]
x_test = list(map(int, raw_x))
x_test = np.array(x_test).reshape(1, -1)

#load model and predict
model = joblib.load('ml_model/mlp_model.pkl')
y_pred = model.predict(x_test)

print(y_pred[0], end="")
sys.stdout.flush()