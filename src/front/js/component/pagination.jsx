import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

function generatePages(){

}

export function Pagination({ currentPage, pages, element }) {
    return (

        <nav aria-label="...">
            <ul className="pagination">
                <li className={"page-item"+((currentPage==0)?" disabled": "")}>
                    <Link className="page-link" to={`/${element}/${currentPage-1}`}>Previous</Link>
                </li>

                {
                    Array(pages).fill('').map((e,i)=>{
                        return(
                            <li className={"page-item"+((currentPage==i)?" active":"")}><Link className="page-link" to={`/${element}/${i}`}>{i+1}</Link></li>                            
                        )
                    })
                }
                <li className={"page-item"+((currentPage==pages)?" disabled": "")}>
                    <Link className="page-link" to={`/${element}/${currentPage+1}`}>Next</Link>
                </li>
            </ul>
        </nav>
    )
}
