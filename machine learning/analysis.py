import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM

csv = pd.read_csv("buyOrdersT.csv").fillna(0)
# drop the top layer to have 1062 rows, which is evenly divisibly by 177
temp = csv.loc[1062,]

csv.drop(csv.index[1062],inplace=True)

# split into 177 equal subarrays for training data
x_train = np.transpose(np.dstack(np.split(csv.values,6,axis=0)),(0,2,1))

y_train = [np.array(i[0]) for i in x_train][1:]
y_train.append(temp)
y_train=np.transpose(np.dstack(y_train),(2,0,1))
# y_train.reshape(y_train.shape[0],1,y_train.shape[1])

print(x_train.shape)
print(y_train.shape)

# partition the data into testing and training data.
x_test = x_train[157:]
x_train= x_train[:157]
y_test = y_train[157:]
y_train= y_train[:157]
print(x_test.shape)
print(y_test.shape)


model = Sequential()
model.add(LSTM(128, input_shape=x_train.shape[1:], activation='relu', return_sequences=True))
model.add(Dropout(0.2))

model.add(LSTM(128, activation='relu'))
model.add(Dropout(0.1))

model.add(Dense(32, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(3, activation='softmax'))
opt = tf.keras.optimizers.Adam(lr=0.001, decay=1e-6)

model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer=opt,
    metrics=['accuracy']
)

model.fit(x_train,
          y_train,
          epochs=3,
          validation_data=(x_test, y_test))