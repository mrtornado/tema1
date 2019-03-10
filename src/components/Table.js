import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.studenti,
      sort: {
        column: null,
        direction: "desc"
      }
    };
  }

  onSort = (column) => {
    return (e) => {
      const direction = this.state.sort.column
        ? this.state.sort.direction === "asc"
          ? "desc"
          : "asc"
        : "desc";
      const sortedUsers = this.state.users.sort((a, b) => {
        if (column === "name.first") {
          const nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.first.toUpperCase(); // ignore upper and lowercase

          if (nameA < nameB) return -1;
          if (nameA < nameB) return 1;
          else return 0;
        } else {
          return a.name.first - b.name.first;
        }
      });

      if (direction === "desc") {
        sortedUsers.reverse();
      }

      this.setState({
        users: sortedUsers,
        sort: {
          column,
          direction
        }
      });
    };
  };

  setArrow = (column) => {
    let className = "sort-direction";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }

    return className;
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={this.onSort("name.first")}>
              First Name
              <span className={this.setArrow("name.first")} />
            </th>
            <th onClick={this.onSort("name.last")}>
              Last Name
              <span className={this.setArrow("name.last")} />
            </th>
            <th onClick={this.onSort("company")}>
              Company
              <span className={this.setArrow("company")} />
            </th>
            <th onClick={this.onSort("phone")}>
              Phone
              <span className={this.setArrow("phone")} />
            </th>
            <th onClick={this.onSort("email")}>
              Email
              <span className={this.setArrow("email")} />
            </th>
            <th onClick={this.onSort("birthdate")}>
              Birthdate
              <span className={this.setArrow("birthdate")} />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, index) => {
            return (
              <tr>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.company}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.birthdate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
