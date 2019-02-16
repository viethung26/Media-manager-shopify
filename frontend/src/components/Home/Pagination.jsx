import React, { Component } from 'react'

class Pagination extends Component {
    render() {
        let rows = []
        for(let i=1; i<= this.props.pagesCount; i++) rows.push( <li key={i} className="page-item"><a onClick={()=>this.props.onChangePagination(i)} className="page-link" href="#">{i}</a></li>)
        return (
            <nav>
                <ul className="pagination">
                   {rows}
                </ul>
            </nav>
        )
    }
}
export default Pagination