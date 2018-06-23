import React from 'react';
import { Input } from 'semantic-ui-react';


const styles = {
  weightsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridRowGap: 10,
    justifyItems: 'center',
    alignItems: 'center'
  },
  input: {
    width: 100
  },
  inputLabel: {
    display: 'inline-block',
    padding: '0px 10px'
  }
};


const WeightsDisplay = props => {
  const [w0, w1, w2] = props.weights.map(weight => weight.toFixed(5));
  return (
    <div style={styles.weightsContainer}>
      <div>
        <span style={styles.inputLabel}>w0</span>
        <Input placeholder="w0" value={w0 || 0.0} readOnly style={styles.input} />
      </div>
      <div>
        <span style={styles.inputLabel}>w1</span>
        <Input placeholder="w1" value={w1 || 0.0} readOnly style={styles.input} />
      </div>
      <div>
        <span style={styles.inputLabel}>w2</span>
        <Input placeholder="w2" value={w2 || 0.0} readOnly style={styles.input} />
      </div>
    </div>
  );
};

export default WeightsDisplay;
