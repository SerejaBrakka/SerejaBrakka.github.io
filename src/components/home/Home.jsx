import React from "react";
import noris from "./../../assets/noris.png";
import classes from "./Home.module.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomState: [
        ["Email addresses", "IP addresses", "Names", "Passwords"],
        [
          "Good news — no pwnage found ! No breached accounts and no pastes !!!",
        ],
      ],
      account: [],
      inputValue: "",
    };
  }
  // getAnswer срабатывает при нажатии на кнопку отправки e-mail и создают эмуляцию запроса на сервер
  getAnswer(e) {
    e.preventDefault();
    const emailReg =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailReg.test(this.state.inputValue) === false) {
      alert("That's not real account");
      throw Error("That's not real account");
    } else {
      // fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${account}`).then((res)=>res.json()).then(res=>setAccount(res))
      //Т.к через апи нужен ключ , сделал как сказано в первом пункте, захардкодил и рандомно вывожу, найдены украденные данные или нет
      this.setState({
        account: this.state.randomState[Math.ceil(Math.random() * 2) - 1],
      });
    }
  }
  //метод render рандомно отрисовывает были ли найдены украденные данные или все чисто
  render() {
    return (
      <div className={classes.main}>
        <div className={classes.head}>
          <h1>';--have i been pwned?</h1>
        </div>
        <p>Check if your email or phone is in a data breach</p>
        <div className={classes.container}>
          <form className={classes.form}>
            <input
              className={classes.container__input}
              value={this.state.inputValue}
              onChange={(e) => {
                this.setState({ inputValue: e.target.value });
              }}
              placeholder="Enter Your Valid E-mail "
            />
            <button
              className={classes.container__button}
              type="button"
              onClick={(e) => {
                this.getAnswer(e);
              }}
            >
              pwned?
            </button>
          </form>
        </div>
        <div
          className={classes.output}
          style={{
            backgroundColor:
              this.state.account.length === 0
                ? "white"
                : this.state.account.length > 1
                ? "red"
                : "green",
          }}
        >
          {this.state.account.length === 0 ? null : this.state.account
              .length === 1 ? (
            this.state.account.map((e, i) => (
              <div className={classes.flexCenter} key={i}>
                <p>{e}</p>
                <img src={noris}></img>
              </div>
            ))
          ) : (
            <div className={classes.redOutput}>
              <img src={this.props.someSites.LogoPath} />
              <p>{this.props.someSites.Name}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: this.props.someSites.Description,
                }}
              ></p>
              Data:
              {this.state.randomState[0].map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
