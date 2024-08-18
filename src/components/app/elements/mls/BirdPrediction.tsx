import { trainModel } from '@/ml/utils/modelTraining';
import { predict } from '@/ml/utils/prediction';
import { FC, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const BirdPrediction: FC = () => {
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    // const [prediction, setPrediction] = useState<number | null>;

    return (
        <div>
            <button></button>
        </div>
    );
};

export default BirdPrediction;
