import * as tf from '@tensorflow/tfjs';

export const createModel = () => {
    const model = tf.sequential();
    model.add(
        tf.layers.dense({ units: 10, inputShape: [5], activation: 'relu' }),
    );
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    return model;
};
