import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM
from sklearn import preprocessing
import tensorflow.keras.backend as K

# rtx int16
# dtype = 'float16'
# K.set_floatx(dtype)
# K.set_epsilon(1e-4) 

csv = pd.read_csv("buyOrdersT.csv").fillna(0)

# normalize 
csv = (csv-csv.mean(axis=0))/csv.std(axis=0)


# drop the top layer to have 1062 rows, which is evenly divisibly by 177
temp = csv.loc[1062,]

csv.drop(csv.index[1062],inplace=True)

# split into 177 equal subarrays for training data
x_train = np.transpose(np.dstack([i for i in np.split(csv.values,177,axis=0)]),(2,0,1))

y_train = [np.array(i[0]) for i in x_train]
# y_train.append(temp)
y_train= np.squeeze(np.transpose(np.dstack(y_train),(0,2,1)))
# y_train.reshape(y_train.shape[0],1,y_train.shape[1])

print(x_train.shape)
print(y_train.shape)

# # partition the data into testing and training data.
x_test = x_train[157:]
x_train= x_train[:157]
y_test = y_train[157:]
y_train= y_train[:157]
print(x_test.shape)
print(y_test.shape)
# clear from ram
csv = None

model = Sequential()
model.add(LSTM(1200, input_shape=(x_train.shape[1:]), activation='tanh',return_sequences=True))
model.add(Dropout(0.2))

model.add(LSTM(1200, activation='tanh'))
model.add(Dropout(0.1))


# model.add(LSTM(x_train.shape[-1], activation='relu'))
# model.add(Dropout(0.1))

# model.add(LSTM(x_train.shape[-1], activation='relu'))
# model.add(Dropout(0.1))



model.add(Dense(y_train.shape[-1], activation='linear'))



opt = tf.keras.optimizers.Adam(lr=0.001, decay=1e-7)

model.compile(
    loss='mean_squared_error',
    optimizer=opt#,
    # metrics=['categorical_accuracy']
)

model.fit(x_train,
          y_train,
          epochs=100,
          validation_data=(x_test, y_test)
          )