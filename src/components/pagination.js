import React,{Component} from 'react';
import { mixedTypeAnnotation } from '@babel/types';


class Pagination extends Component{

    state = {
        page : 1,
        itemPerPage:10
    }

    changePage = (update) => {
        console.log(this.props.size +" "+ Math.max(this.props.size / this.state.itemPerPage,1))
        if(update >= 1 && update <= Math.max(this.props.size / this.state.itemPerPage,1)) {
            this.setState({
                page:update
            })
            this.props.update(this.newOptionsPage(update))
        }
    }
     
    changeSize (size){
        this.setState({
            itemPerPage:size
        });
        this.props.update(this.newOptionsSize(size));
    }

    newOptionsPage(update){
        return {page: update, itemPerPage:this.state.itemPerPage};
    }

    newOptionsSize(update){
        return {page: this.state.page, itemPerPage:update};
    }

    render(){
        return (
            <div className="pagination" display ="inline">
                <div className = "pageNavigate" display ="inline-block">
                    <button className = "pageButton" onClick={()=> this.changePage(this.state.page -1)}>
                        Previous
                    </button>
                        <button className = "pageButton" onClick={()=> this.changePage(this.state.page +1)}>
                        Next
                        </button>
                </div>
                <div className = "sizeNavigate" display="inline-block">
                    <button className = "pageButton" onClick={() => this.changeSize(10)}>
                        10
                    </button>
                    <button className = "pageButton" onClick={() => this.changeSize(50)}>
                        50
                    </button>
                    <button className = "pageButton" onClick={() => this.changeSize(100)}>
                        100
                    </button>
                </div>
            </div> 
        )
    }
}

export default Pagination;