import React, { Component } from 'react';
import NavBar from './components/Navbar';
import * as R from 'ramda';
import 'semantic-ui-css/semantic.min.css';
import utils from './utils';
import PerceptronLearner from './learners/PerceptronLearner';
import './style.css';
import Grid from './components/Grid';
import ClassSelector from './components/ClassSelector';
import WeightsDisplay from './components/WeightsDisplay';
import TrainingControls from './components/TrainingControls';
import PerceptronInstructions from './components/PerceptronInstructions';


const styles = {
  pageContainer: {
    display: 'grid',
    padding: 15,
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gridRowGap: 10,
    justifyItems: 'center',
    alignItems: 'center'
  },
  gridContainer: {
    display: 'grid'
  }
};


const plotConfig = {
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
  width: 500,
  height: 500
};


let sampleId = 0;


const getDefaultState = () => ({
  classSelection: 'positive',
  data: [],
  weights: [],
  hyperplaneData: [],
  formData: {
    learnRate: 0.1,
    epochs: 500,
    delay: 100
  }
});



class App extends Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChartClick = this.handleChartClick.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.initWeights = this.initWeights.bind(this);
    this.clearChart = this.clearChart.bind(this);
    this.drawHyperplane = this.drawHyperplane.bind(this);
    this.trainPerceptron = this.trainPerceptron.bind(this);
    this.handlePerceptronUpdate = this.handlePerceptronUpdate.bind(this);
    this.handlePerceptronError = this.handlePerceptronError.bind(this);
    this.handlePerceptronComplete = this.handlePerceptronComplete.bind(this);
  }
  

  handleInputChange({ target }) {
    const { name, value } = target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  }


  handleChartClick({ xValue, yValue }){
    const { data, classSelection } = this.state;
    const z = (classSelection === 'positive') ? 1 : 0;
    const id = sampleId++;
    const sample = { x: xValue, y: yValue, z, id };
    this.setState({ data: data.concat([sample]) });
  }


  handleClassSelection(classSelection) {
    this.setState({ classSelection });
  }


  initWeights = R.compose(
    weights => R.tap(this.setState({ weights })),
    R.map(Number),
    R.map(() => utils.getRandomFromRange(-1, 1)),
    () => new Array(3)
  );


  clearChart() {
    this.setState({ weights: [], hyperplaneData: [],  data: [] });
  }


  drawHyperplane(slope, intercept) {
    const hyperplaneData = [
      { x: plotConfig.xMin, y: (slope * plotConfig.xMin) + intercept },
      { x: plotConfig.xMax, y: (slope * plotConfig.xMax) + intercept },
      { x: (plotConfig.yMax / slope) - (intercept / slope), y: plotConfig.yMax },
      { x: (plotConfig.yMin / slope) - (intercept / slope), y: plotConfig.yMin },
    ]
      .filter(({ x }) => x >= plotConfig.xMin && x <= plotConfig.xMax)
      .filter(({ y }) => y >= plotConfig.yMin && y <= plotConfig.yMax);
    this.setState({ hyperplaneData });
  }


  trainPerceptron() {
    const { weights, data, formData } = this.state;
    const { delay, epochs, learnRate } = formData;
    const features = data
      .map(({ x, y }) => ([x,y]))
      .map(utils.prependBias);
    const labels = data.map(({ z }) => z);
    const input = { features, labels, weights };
    const params = { epochs, learnRate, delay };
    const result = PerceptronLearner.trainPerceptron(params, input)
      .subscribe(
        this.handlePerceptronUpdate,
        this.handlePerceptronError,
        this.handlePerceptronComplete
      );
  }


  handlePerceptronUpdate({ weights, errors, iter }) {
    this.setState({ weights, errors, iter });
    const [w0, w1, w2] = weights;
    const intercept = w0 / w2 * -1;
    const slope = w1 / w2 * -1;
    this.drawHyperplane(slope, intercept);
  }


  handlePerceptronError(err) {
    console.log('perceptron error', err);
  }


  handlePerceptronComplete() {
    console.log('perceptron complete');
  }

  render() {    
    const { data, weights, classSelection, hyperplaneData, formData } = this.state;
    const weightsBtnText = (weights.length) ? 'Randomize Weights' : 'Initialize Weights';
    return (
      <React.Fragment>
        <NavBar />

        <div style={styles.pageContainer}>

          {/* Instructions */}
          <PerceptronInstructions />

          {/* Canvas */}
          <div style={styles.gridContainer}>
            <ClassSelector
              selection={classSelection}
              handleClassSelection={this.handleClassSelection}
            />
            <Grid
              handleChartClick={this.handleChartClick}
              data={data}
              hyperplaneData={hyperplaneData}
              plotConfig={plotConfig}
            />
            <WeightsDisplay weights={weights} />
          </div>

          {/* Controls */}
          <TrainingControls
            handleInputChange={this.handleInputChange}
            handleClearChart={this.clearChart}
            handleInitWeights={this.initWeights}
            handleTrainPerceptron={this.trainPerceptron}
            formData={formData}
          />

        </div>

      </React.Fragment>
    );
  }
}

export default App;
