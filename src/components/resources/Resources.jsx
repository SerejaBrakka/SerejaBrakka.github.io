import React, { useState,useEffect } from 'react'
import Pagination from '../pagination/Pagination'
import classes from './Resources.module.css'
/* Список всех ресурсов в базе , фильтрация (сделал в обратном порядке , потому что данные которые приходят и так отсортированы), поиск , пагинация 
Отображены: логотип название описание и список скомпрометированных данных
*/

const Resources = () => {
    let [breachedSites,setBreachedSites] = useState([])

    useEffect(() => {
      fetch("https://haveibeenpwned.com/api/v3/breaches")
        .then((res) => res.json())
        .then((res) => setBreachedSites(res));
    }, []);

const [value,setValue] = useState('')

const [currentPage,setCurrentPage] = useState(1)
const [sitesPerPage] = useState(10)

function setCurrentValue (e) {
  setValue(e.target.value);
  setCurrentPage(1)
}

const filteredSites = breachedSites.filter(site=> {
    return site.Name.toLowerCase().includes(value.toLowerCase()) || site.Domain.toLowerCase().includes(value.toLowerCase())
})
const lastSiteIndex = currentPage * sitesPerPage
const firstSiteIndex = lastSiteIndex - sitesPerPage
let currentSite = filteredSites.slice(firstSiteIndex,lastSiteIndex)


const paginate = (pageNumber)=> setCurrentPage(pageNumber)
  

const sortDataName = () => {
    let sortDatas = [...breachedSites].sort((a,b)=>b.Name> a.Name ? 1: -1)
    setBreachedSites(sortDatas)
  
}
const sortDataDomain = () => {
    let sortDatas = [...breachedSites].sort((a,b)=>b.Domain> a.Domain ? 1: -1)
    setBreachedSites(sortDatas)
  
}
    
return (
  <div className={classes.form}>
    <div className={classes.find}>
      <div>
        <p>Фильтрация по домену и имени</p>
        <input
          value={value}
          // onChange={(e) => setValue(e.target.value)}
          onChange={(e) => setCurrentValue(e)}
          placeholder="Искать..."
        />
      </div>
      <div className={classes.sorted}>
        <p>Сортировка по:</p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            sortDataName();
          }}
        >
          имени
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
            {e.DataClasses.map((e) => (
              <span>{e}, </span>
            ))}
          </p>
          <p dangerouslySetInnerHTML={{ __html: e.Description }}></p>
        </div>
      ))
    ) : (
      <div className={classes.recoveryDiv}>Ничего не найдено...</div>
    )}
    <Pagination
      paginate={paginate}
      sitesPerPage={sitesPerPage}
      totalSites={breachedSites.length}
    />
  </div>
);
}

export default Resources