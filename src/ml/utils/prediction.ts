import * as tf from '@tensorflow/tfjs';

export const predict = (model: tf.LayersModel, input: number[]) => {
    const inputTensor = tf.tensor2d([input]);
    const prediction = model.predict(inputTensor) as tf.Tensor;

    return prediction.dataSync()[0];
};
