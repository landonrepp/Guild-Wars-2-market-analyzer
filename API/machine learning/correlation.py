import pandas as pd
import numpy as np
from tqdm import tqdm
from scipy import stats

buyOrders = pd.read_csv("buyOrdersT.csv").fillna(0)
# keep commented for debugging
buyOrders.corr().to_csv(r"buyOrdersCorrelation.csv")
print("looping...")
for l in tqdm(buyOrders.columns):
    leastSqShape = np.array([[1,buyOrders[l][i]] for i in range(buyOrders.shape[0])])
    soln = np.linalg.inv(leastSqShape.T.dot(leastSqShape)).dot(leastSqShape.T).dot(buyOrders.values)
    regressionPredictions = leastSqShape.dot(soln)
    buyOrdersMean = np.mean(buyOrders.values,axis=0)
    # print(buyOrders.values.shape,buyOrdersMean.shape)    
    SSE = np.sum(buyOrders.values-regressionPredictions,axis=0)**2
    SSR = np.sum(regressionPredictions-buyOrdersMean,axis=0)**2
    SST = SSR + SSE
    #print(list(SSE))
    # print(list(SSR-SST))
    Rsq = SSR/SST
    FScore = SSR/(SSE/(regressionPredictions.shape[0]-2))
    criticalF = stats.f.ppf(.95,2,buyOrders.shape[0])
    FTest = [1 if i>criticalF else 0 for i in FScore]
    output = np.vstack((soln,Rsq,FTest))
    # output = np.vstack((output,Rsq))
    x = pd.DataFrame({buyOrders.columns[i]:output[:,i] for i in range(len(buyOrders.columns))})

    # print(x.head())
    x.to_csv("regression/buyOrdersleastSquares-%s.csv"%l)
