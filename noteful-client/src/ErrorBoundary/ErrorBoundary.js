import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {      
      return (
        <h2>Could not display this currency.</h2>
      );
    }
    return this.props.children;
  }  
}
