import React from 'react';
import { Header } from 'semantic-ui-react'

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: 15
  },
}
const PerceptronInstructions = props => (
  <div style={{ fontSize: '1.2em' }}>
    <Header as='h2'>Perceptron Learner</Header>
    <ul>
      <li>Single neuron supervised learning model</li>
      <li>Learns classifier for linearly separable data</li>
      <li>Will converge if data is linearly separable</li>
    </ul>
    <Header as='h2'>Weight Updating</Header>
    <ul>
      <li>Calculate prediction for an instance</li>
      <li>Determine error (expected - prediction)</li>
      <li>Update weights (learning rate * error * input)</li>
      <li>Repeat until no error or max iters reached</li>
    </ul>
    <Header as='h2'>Instructions</Header>
    <ul>
      <li>Draw positive & negative samples on plot</li>
      <li>Select learning rate and delay</li>
      <li>Initialize the weights</li>
      <li>Train the perceptron</li>
    </ul>
  </div>
);

export default PerceptronInstructions;
