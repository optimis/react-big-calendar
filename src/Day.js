import PropTypes from 'prop-types';
import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import { navigate } from './utils/constants';
import Paper from 'material-ui/Paper';

class Day extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  render() {
    let { date, ...props } = this.props;
    let range = Day.range(date)

    return (
      <Paper zDepth={2}>
        <TimeGrid {...props} range={range} eventOffset={10} />
      </Paper>
    );
  }
}

Day.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}


Day.range = (date)=> {
  return [dates.startOf(date, 'day')]
}


export default Day
