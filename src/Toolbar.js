import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import { blue300 } from 'material-ui/styles/colors';
import BackBtn from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ForwardBtn from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  render() {
    let { messages, label } = this.props;

    messages = message(messages);

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>


          <FlatButton
             onClick={this.navigate.bind(null, navigate.PREVIOUS)}
             icon={<BackBtn />}
          />
          <FlatButton
            primary={true}
            label={messages.today}
            onClick={this.navigate.bind(null, navigate.TODAY)} />
          <FlatButton
            onClick={this.navigate.bind(null, navigate.NEXT)}
            icon={<ForwardBtn />}
          />
        </span>

        <span className='rbc-toolbar-label'>
          <Chip>{label}</Chip>
        </span>

        <span className='rbc-btn-group'>
        {
          this.viewNamesGroup(messages)
        }
        </span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        ["month", "week", "day", "agenda"].map(name =>
                      <FlatButton
                        key={name}
                        style={{marginLeft: 10}}
                        label={messages[name]}
                        className={cn({'rbc-active': view === name})}
                        onClick={this.view.bind(null, name)} />
        )
      )
    }
  }
}

export default Toolbar;
