var React = require('react');
var ReactDOM = require('react-dom');
import rd3 from 'rd3';


var PieChart = rd3.PieChart;
var numProducts = {
  camera: 0,
  computer: 0,
  monitor: 0,
  printer: 0
}
var pieData = [{label: "Camera", value: 20.0}, {label: "Computer", value: 55.0}, {label: "Monitor", value: 12.5 }, {label: "Printer", value: 12.5 }];

class Pie extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return  (
      <div className='brownContainer'>
      	<PieChart
        data={pieData}
        width={400}
        height={400}
        radius={110}
        innerRadius={20}
        sectorBorderColor="white"
        title="Outstanding Issues" />
      </div>
    );
  };
};

export default Pie;
