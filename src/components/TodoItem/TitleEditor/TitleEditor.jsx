import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { UpdateTodo } from '../../../signal/events';

class TitleEditor extends PureComponent {
  inputRef = React.createRef()

  constructor(props) {
    super(props);

    const { todo } = this.props;
    this.state = { value: todo.title };
  }

  componentDidMount() {
    this.setFocus();
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  onKeyUp = ({ keyCode }) => {
    const { todo } = this.props;
    if (keyCode === 13) {
      const { value } = this.state;
      this.namespace().trigger(UpdateTodo.with({
        ...todo,
        edited: false,
        title: value,
      }));
    } else if (keyCode === 27) {
      this.reset();
    }
  }

  setFocus() {
    this.inputRef.current.focus();
  }

  reset = () => {
    const { todo } = this.props;
    this.namespace().trigger(UpdateTodo.with({
      ...todo,
      edited: false,
    }));
  }

  render() {
    const { value } = this.state;
    return (
      <input
        type="text"
        value={value}
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
        onBlur={this.reset}
        className="edit-title"
        ref={this.inputRef}
      />
    );
  }
}

TitleEditor.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};


export default TitleEditor;
