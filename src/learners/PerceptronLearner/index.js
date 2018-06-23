import utils from '../../utils';
import * as R from 'ramda';
import { Observable } from 'rxjs';


const trainPerceptron = R.curry((hyperparams, input) => {
  // gather input and params
  const { learnRate = 0.1, epochs = 1000, delay = 100 } = hyperparams;
  const { features, labels } = input;
  let { weights } = input;
  let errors = [];

  // validate input (somewhat)
  if (!Array.isArray(features) || !Array.isArray(labels) ||
    !features.length || !labels.length || features.length !== labels.length) {
      return Observable.create();
    }

  // using median of labels as threshold of activation function
  // const activationThreshold = R.median(labels);
  const { min, max } = utils.getMinMax(labels);
  const activationThreshold = min + ((max - min) / 2);

  // define activation function
  const activationFunction = utils.signFunction(activationThreshold);

  // combine features and labels into array of objects
  const data = features.map((feature, idx) => Object.assign({}, { feature, label: labels[idx]}));

  // return an observable, will stream weights/errors as they update
  return Observable.create((observer => {
    (function completeIteration(iter) {
      // keep track of total errors per iteration
      let errorCount = 0;
      // iterate over entire data set
      data.forEach(({ feature, label }) => {  
        // calculate weighted some of inputs
        const result = feature
          .map((x, idx) => x * weights[idx])
          .reduce((a, b) => a + b, 0);
  
        // calc prediction -> apply activation function onto the weighted sum
        const prediction = activationFunction(result);

        // update weights (no update will occur if desired output == predicted output)
        const deltaWeights = weights
          .map((weight, idx) => learnRate * (label - prediction) * feature[idx]);
        
        if (prediction !== label) {
          errorCount += 1;
          // update the weights, we are learning!
          weights = weights
            .map((weight, idx) => Number(weight) + Number(deltaWeights[idx]));
        }
      })
      // record epochs error count
      errors = errors.concat([errorCount]);
      observer.next({ weights, errors, iter });
      // perform next iteration
      if (iter < epochs && errorCount) setTimeout(() => completeIteration(iter + 1), delay);
      else observer.complete();
    })(0, epochs)
  }))
});


export default {
  trainPerceptron
};
