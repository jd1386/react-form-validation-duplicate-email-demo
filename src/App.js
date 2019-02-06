import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    typedEmail: '',
    isDuplicateUser: false
  };

  async handleOnChange(typedEmail) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    const users = response.data;
    const isUserFound = users.filter(user => user.email === typedEmail).length;

    isUserFound
      ? this.setState({
          typedEmail,
          isDuplicateUser: true
        })
      : this.setState({
          typedEmail,
          isDuplicateUser: false
        });
  }

  // handleOnChangePromise(typedEmail) {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
  //     const users = response.data;
  //     const isUserFound = users.filter(user => user.email === typedEmail)
  //       .length;

  //     isUserFound
  //       ? this.setState({ isDuplicateUser: true })
  //       : this.setState({ isDuplicateUser: false });
  //   });
  // }

  emailInputClassName() {
    if (this.state.typedEmail) {
      return this.state.isDuplicateUser ? 'is-invalid' : 'is-valid';
    }
    return '';
  }

  renderFeedbackMessage() {
    if (this.state.typedEmail) {
      return this.state.isDuplicateUser ? (
        <div className="invalid-feedback">이미 등록되어 있는 이메일입니다</div>
      ) : (
        <div className="valid-feedback">사용할 수 있는 이메일입니다</div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <form className="my-form">
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="emailInput">이메일</label>
              <input
                type="email"
                className={`form-control ${this.emailInputClassName()}`}
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="abc@gmail.com"
                onChange={e => this.handleOnChange(e.target.value)}
              />
              {this.renderFeedbackMessage()}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default App;
