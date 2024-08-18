import * as tf from '@tensorflow/tfjs';
import { createModel } from '../models/birdPredictionModel';
import { trainingData } from '../data/trainingData';

export const trainModel = async () => {
    const model = createModel();
    const xs = tf.tensor2d(trainingData.map((d) => d.input));
    const ys = tf.tensor2d(trainingData.map((d) => d.output));

    await model.fit(xs, ys, {
        epochs: 100,
        callbacks: {
            onEpochEnd: (epoch: any, logs: any) => {
                console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
            },
        },
    });

    return model;
};
