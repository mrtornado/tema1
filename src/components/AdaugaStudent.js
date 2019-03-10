import React, { Component } from "react";

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class AdaugaStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nume: "",
      prenume: "",
      varsta: "",
      media: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const key = ID();
    const { nume, prenume, varsta, media } = this.state;
    const validat = this.validate();

    if (this.props.studCount >= 9) {
      return alert("No more then 9 students allowed");
    } else if (validat) {
      this.props.handleAdaugaStudent(nume, prenume, varsta, media, key);
      this.setState({
        nume: "",
        prenume: "",
        varsta: "",
        media: "",
        key: ""
      });
    }
  }

  validate() {
    return this.form.current.reportValidity();
  }

  render() {
    return (
      <div className="container">
        <form
          ref={this.form}
          name="adauga"
          onSubmit={this.handleSubmit}
          style={{ marginTop: "10px" }}
        >
          <input
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="nume"
            value={this.state.nume}
            onChange={this.handleChange}
            placeholder="First Name"
            required
            minLength="4"
            type="text"
          />
          <br />
          <input
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="prenume"
            value={this.state.prenume}
            onChange={this.handleChange}
            placeholder="Last Name"
            required
            minLength="4"
            type="text"
          />
          <br />
          <input
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="varsta"
            value={this.state.varsta}
            onChange={this.handleChange}
            placeholder="Age"
            required
            pattern="\d+"
            title="Please use only positive numbers"
            maxLength="4"
            type="text"
          />
          <br />
          <input
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="media"
            value={this.state.media}
            onChange={this.handleChange}
            placeholder="Grade"
            required
            pattern="\d{0,2}(\.\d{0,1})"
            title="Please use a decimal number (example: 8.7)"
            type="text"
          />
          <br />
          <button
            style={{ marginTop: "10px" }}
            className="btn btn-raised btn-success"
            onClick={this.handleSubmit}
          >
            Add Student
          </button>
        </form>
      </div>
    );
  }
}

export default AdaugaStudent;
