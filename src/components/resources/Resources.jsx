import React from "react";
import Pagination from "../pagination/Pagination";
import classes from "./Resources.module.css";
/* Список всех ресурсов в базе , фильтрация (сделал в обратном порядке , потому что данные которые приходят и так отсортированы), поиск , пагинация 
Отображены: логотип название описание и список скомпрометированных данных
*/

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breachedSites: [],
      value: "",
      currentPage: 1,
      sitesPerPage: 10,
    };
  }
  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };
  //запрос при монтировании компоненты
  componentDidMount() {
    fetch("https://haveibeenpwned.com/api/v3/breaches")
      .then((res) => res.json())
      .then((res) => this.setState({ breachedSites: res }));
  }
  // в методе рендер фильтрую, произвожу поиск и вывожу сайты текущей страницы
  render() {
    const filteredSites = this.state.breachedSites.filter((site) => {
      return (
        site.Name.toLowerCase().includes(this.state.value.toLowerCase()) ||
        site.Domain.toLowerCase().includes(this.state.value.toLowerCase())
      );
    });
    const lastSiteIndex = this.state.currentPage * this.state.sitesPerPage;
    const firstSiteIndex = lastSiteIndex - this.state.sitesPerPage;
    let currentSite = filteredSites.slice(firstSiteIndex, lastSiteIndex);

    const sortDataName = () => {
      let sortDatas = [...this.state.breachedSites].sort((a, b) =>
        b.Name > a.Name ? 1 : -1
      );
      this.setState({ breachedSites: sortDatas });
    };
    const sortDataDomain = () => {
      let sortDatas = [...this.state.breachedSites].sort((a, b) =>
        b.Domain > a.Domain ? 1 : -1
      );
      this.setState({ breachedSites: sortDatas });
    };
    return (
      <div className={classes.form}>
        <div className={classes.find}>
          <div>
            <p>Фильтрация по домену и имени</p>
            <input
              value={this.state.value}
              onChange={(e) => {
                this.setState({ value: e.target.value });
                this.setState({ currentPage: 1 });
              }}
              placeholder="Искать..."
            />
          </div>
          <div className={classes.sorted}>
            <p>Сортировка:</p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                sortDataName();
              }}
            >
              по имени
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                sortDataDomain();
              }}
            >
              по домену
            </p>
          </div>
        </div>

        {currentSite.length ? (
          currentSite.map((e) => (
            <div className={classes.container} key={e.Title}>
              <h1 className={classes.name}>{e.Name}</h1>
              <img className={classes.logo} src={e.LogoPath}></img>
              <p>{e.Domain}</p>
              <p>
                DataClasses:
                <br />
                {e.DataClasses.map((e, i) => (
                  <span key={i}>{e}, </span>
                ))}
              </p>
              <p dangerouslySetInnerHTML={{ __html: e.Description }}></p>
            </div>
          ))
        ) : (
          <div className={classes.recoveryDiv}>Ничего не найдено...</div>
        )}
        <Pagination
          paginate={this.paginate}
          sitesPerPage={this.state.sitesPerPage}
          totalSites={this.state.breachedSites.length}
        />
      </div>
    );
  }
}

export default Resources;
