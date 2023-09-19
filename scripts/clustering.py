import argparse
import json
import warnings

import numpy as np
import tensorflow as tf
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import Model, Sequential
from yellowbrick.cluster import KElbowVisualizer

warnings.filterwarnings('ignore')


class CoverageData:
    '''CoverageData class'''

    def __init__(self, data):
        self.data = data
        self.function_cov = []
        self.branch_cov = []
        self.statement_cov = []
        self.code = ''
        self._cov()

    def _cov(self):
        self.code = self.data['Code']
        for i in range(len(self.data['Trace'])):
            if self.data['Trace'][i]['type'] == 'function':
                self.function_cov.append(self.data['Trace'][i]['hits'])
            elif self.data['Trace'][i]['type'] == 'branch' or self.data['Trace'][i]['type'] == 'if':
                self.branch_cov.append(self.data['Trace'][i]['hits'])
            elif self.data['Trace'][i]['type'] == 'statement':
                self.statement_cov.append(self.data['Trace'][i]['hits'])

    def __str__(self):
        return f'code:\n{self.code}\nobjective_cov: {self.function_cov + self.branch_cov}\nstatement_cov: {self.statement_cov}'


def setup():
    '''basic setup'''
    tf.random.set_seed(42)
    np.random.seed(42)


def load_execution_data(file_path):
    '''load execution data'''
    with open(file_path, 'r', encoding='utf-8') as data_file:
        data = json.load(data_file)

    coverage_data = [CoverageData(data[i]) for i in range(len(data))]

    objective_cov = np.array([coverage_data[i].function_cov +
                             coverage_data[i].branch_cov for i in range(len(coverage_data))])

    return objective_cov


def autoencoder(raw_data):
    '''classic autoencoder structure'''
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(raw_data)
    n_inputs = x_scaled.shape[1]

    model = Sequential([
        Dense(int(n_inputs/2), activation='selu', input_shape=[n_inputs]),
        Dense(int(n_inputs/4), activation='selu'),
        Dense(2, activation='selu', name='latent_layer'),
        Dense(int(n_inputs/4), activation='selu'),
        Dense(int(n_inputs/2), activation='selu'),
        Dense(n_inputs)
    ])

    model.compile(loss='mse', optimizer='adam')
    _ = model.fit(x_scaled, x_scaled, epochs=100, verbose=0)
    latent_model = Model(inputs=model.input,
                         outputs=model.get_layer('latent_layer').output)
    pred = latent_model.predict(x_scaled, verbose=0)

    return pred


def get_optimal_k(pred):
    '''get optimal k using elbow method'''
    model = KMeans(init='random', n_init='auto',
                   max_iter=1000, random_state=42)

    visualizer = KElbowVisualizer(model, k=(2, len(pred)))
    visualizer.fit(pred)

    opti_k = visualizer.elbow_value_

    return opti_k


def kmeans_clustering(pred, opti_k):
    '''kmeans clustering'''
    kmeans = KMeans(n_clusters=opti_k, n_init="auto",
                    random_state=42).fit(pred)
    return kmeans.labels_


def main():
    '''main'''
    parser = argparse.ArgumentParser(description='Clustering')
    parser.add_argument("execution_file_path", type=str,
                        help="Path to execution trace file")
    args = parser.parse_args()

    setup()

    objectives = load_execution_data(args.execution_file_path)
    pred = autoencoder(objectives)
    opti_k = get_optimal_k(pred)
    labels = kmeans_clustering(pred, opti_k)
    print(','.join(map(str, labels)))


if __name__ == '__main__':
    main()
