import React, { Component } from "react";
import AdaugaStudent from "./components/AdaugaStudent";

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class Grupa extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      studenti: [],
      sort: {
        column: null,
        direction: "desc"
      },
      campuri: [
        {
          numeColoana: "nume",
          numeDeAfisare: "First Name",
          afisare: true
        },
        {
          numeColoana: "prenume",
          numeDeAfisare: "Last Name",
          afisare: true
        },
        {
          numeColoana: "varsta",
          numeDeAfisare: "Age",
          afisare: true
        },
        {
          numeColoana: "media",
          numeDeAfisare: "Grade",
          afisare: true
        }
      ]
    };
  }

  componentDidMount() {
    fetch("https://demo3305866.mockable.io/tema_studenti_react")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            studenti: result.students.map((x) => {
              x.key = ID();
              return x;
            })
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  onSort = (column) => {
    return (e) => {
      const direction = this.state.sort.column
        ? this.state.sort.direction === "asc"
          ? "desc"
          : "asc"
        : "desc";
      const sortedStudenti = this.state.studenti.sort((a, b) => {
        if (column === "nume") {
          const nameA = a.nume.toUpperCase();
          const nameB = b.nume.toUpperCase();

          if (nameA < nameB) return -1;
          if (nameA < nameB) return 1;
          else return 0;
        } else if (column === "prenume") {
          const nameA = a.prenume.toUpperCase();
          const nameB = b.prenume.toUpperCase();

          if (nameA < nameB) return -1;
          if (nameA < nameB) return 1;
          else return 0;
        } else if (column === "varsta") {
          const nameA = a.varsta;
          const nameB = b.varsta;

          if (nameA < nameB) return -1;
          if (nameA < nameB) return 1;
          else return 0;
        } else if (column === "media") {
          const nameA = a.media;
          const nameB = b.media;

          if (nameA < nameB) return -1;
          if (nameA < nameB) return 1;
          else return 0;
        } else {
          return a.nume - b.nume;
        }
      });

      if (direction === "desc") {
        sortedStudenti.reverse();
      }

      this.setState({
        studenti: sortedStudenti,
        sort: {
          column,
          direction
        }
      });
    };
  };

  handleRemove(student) {
    const studenti = this.state.studenti.filter((s) => s.key !== student.key);
    this.setState((prevState) => {
      return {
        studenti: studenti
      };
    });
  }

  handleAdaugaStudent = (nume, prenume, varsta, media, key) => {
    const newState = this.state.studenti.concat({
      nume: nume,
      prenume: prenume,
      varsta: varsta,
      media: media,
      key: key
    });
    this.setState((prevState) => {
      return {
        studenti: newState
      };
    });
  };

  render() {
    const { error, isLoaded, studenti, campuri } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div className="jumbotron">
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>
            Today <span style={{ color: "red" }}> {studenti.length}</span>{" "}
            students are attending our class!
          </h1>
          <table
            className="table"
            style={{ border: "2px solid black", borderCollapse: "collapse" }}
          >
            <thead>
              <tr
                style={{
                  lineHeight: "25px",
                  minHeight: "25px",
                  height: "25px"
                }}
              >
                {campuri.map((x) => {
                  return x.afisare ? (
                    <th
                      style={{
                        textAlign: "center",
                        color: "black",
                        width: "25%",
                        border: "2px solid black",
                        backgroundColor: "#FFF8DD",
                        padding: "10px"
                      }}
                      id={x.numeColoana}
                      key={ID()}
                      onClick={this.onSort(x.numeColoana)}
                    >
                      {x.numeDeAfisare}
                    </th>
                  ) : null;
                })}
                <th
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#FFF8DD"
                  }}
                />
              </tr>
            </thead>
            <tbody>
              {studenti.map((student) => {
                return (
                  <tr
                    style={{
                      lineHeight: "25px",
                      minHeight: "25px",
                      height: "25px"
                    }}
                    key={ID()}
                  >
                    {campuri.map((y) => {
                      return y.afisare ? (
                        <td
                          key={ID()}
                          style={{
                            border: "2px solid black",
                            backgroundColor: "#FFF8DD",
                            textAlign: "center",
                            color: "red"
                          }}
                        >
                          {student[y.numeColoana]}
                        </td>
                      ) : null;
                    })}
                    <td
                      style={{
                        backgroundColor: "#FFF8DD",
                        border: "1px solid black"
                      }}
                    >
                      <button
                        className="btn btn-success btn-sm active"
                        onClick={() => this.handleRemove(student)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AdaugaStudent
            handleAdaugaStudent={this.handleAdaugaStudent}
            studCount={studenti.length}
          />
        </div>
      );
    }
  }
}

export default Grupa;
