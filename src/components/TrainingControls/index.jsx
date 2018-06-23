import React, { Component } from 'react';
import { Button, Input, Label } from 'semantic-ui-react';
import './style.css';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: 15
  },
}
const TrainingControls = props => {
  const {
    handleInputChange, handleClearChart, handleInitWeights, handleTrainPerceptron, formData
  } = props;
  return (
    <div style={styles.container}>
      <Input label="Learning Rate" name="learnRate" value={formData.learnRate} onChange={handleInputChange} />
      <Input label="Epochs" name="epochs" value={formData.epochs} onChange={handleInputChange} />
      <Input label="Epoch Delay" name="delay" value={formData.delay} onChange={handleInputChange} />
      <Button onClick={handleClearChart}>Clear Canvas</Button>        
      <Button onClick={handleInitWeights}>Randomize Weights</Button>
      <Button onClick={handleTrainPerceptron}>Train Perceptron</Button>
    </div>
  )
};

export default TrainingControls;
