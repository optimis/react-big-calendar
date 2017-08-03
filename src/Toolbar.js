import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

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

    messages = message(messages)

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <FlatButton
            primary={true}
             onTouchTap={this.navigate.bind(null, navigate.TODAY)}>
            {messages.today}
          </FlatButton>

          <FlatButton
            secondary={true}
             onTouchTap={this.navigate.bind(null, navigate.PREVIOUS)}>
            {messages.previous}
          </FlatButton>
          <FlatButton
            secondary={true}
            onTouchTap={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </FlatButton>
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
        viewNames.map(name =>
                      <FlatButton
                        secondary={true}
                        key={name}
                        style={{marginLeft: 10}}
                        className={cn({'rbc-active': view === name})}
                        onTouchTap={this.view.bind(null, name)}>
                       {messages[name]}
                     </FlatButton>
        )
      )
    }
  }
}

export default Toolbar;
