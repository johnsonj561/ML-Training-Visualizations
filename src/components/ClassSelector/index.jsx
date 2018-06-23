import React from 'react';
import { Radio } from 'semantic-ui-react'

const styles = {
  container: {
    padding: 10,
    textAlign: 'center'
  },
  radioContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
  },
  header: {
    display: 'inline-block',
    padding: 10
  }
};


const ClassSelector = (props) => {
  const { selection, handleClassSelection } = props;
  return (
    <div style={styles.container}>
      <span style={styles.header}>Click Plot to Add New Instances</span>
      <div style={styles.radioContainer}>
        <Radio
          label='Positive Sample'
          name='classSelector'
          value='positive'
          checked={selection === 'positive'}
          onChange={() => handleClassSelection('positive')}
        />
        <Radio
          label='Negative Sample'
          name='classSelector'
          value='negative'
          checked={selection === 'negative'}
          onChange={() => handleClassSelection('negative')}
        />
      </div>
    </div>
  )
}

export default ClassSelector;
