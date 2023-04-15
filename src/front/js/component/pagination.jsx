import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

export function Pagination({ currentPage, pages, element }) {
    return (

        <nav aria-label="...">
            <ul className="pagination">
                <li className={"page-item"+((currentPage<=1)?" disabled": "")}>
                    <Link className="page-link" to={`/${element}?page=${currentPage-1}`}>Previous</Link>
                </li>

                {
                    Array(pages).fill('').map((e,i)=>{
                        return(
                            <li key={i} className={"page-item"+((currentPage==i+1)?" active":"")}><Link className="page-link" to={`/${element}?page=${i+1}`}>{i+1}</Link></li>                            
                        )
                    })
                }
                <li className={"page-item"+((currentPage>=pages)?" disabled": "")}>
                    <Link className="page-link" to={`/${element}?page=${currentPage+1}`}>Next</Link>
                </li>
            </ul>
        </nav>
    )
}


function Pagination2({ currentPage, pages, element }) {
    return (

        <nav aria-label="...">
            <ul className="pagination">
                <li className={"page-item"+((currentPage==0)?" disabled": "")}>
                    <Link className="page-link" to={`/${element}?page=${currentPage-1}`}>Previous</Link>
                </li>

                {
                    Array(pages).fill('').map((e,i)=>{
                        return(
                            <li className={"page-item"+((currentPage==i+1)?" active":"")}><Link className="page-link" to={`/${element}?page=${i+1}`}>{i+1}</Link></li>                            
                        )
                    })
                }
                <li className={"page-item"+((currentPage==pages)?" disabled": "")}>
                    <Link className="page-link" to={`/${element}?page=${currentPage+1}`}>Next</Link>
                </li>
            </ul>
        </nav>
    )
}