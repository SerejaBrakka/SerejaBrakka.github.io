import React from 'react'
import classes from './Pagination.module.css'
const Pagination = ({sitesPerPage,totalSites,paginate}) => {
const pageNumbers = []

for( let i = 1; i <= Math.ceil(totalSites/sitesPerPage); i++) {
    pageNumbers.push(i)
}
  return (
    <div>
        <ul className="pagination">
            {pageNumbers.map(number=>(
                    <a key = {number} className={classes.pagelink} onClick={()=>paginate(number)}>{number}</a>
            ))}
        </ul>
    </div>
  )
}

export default Pagination