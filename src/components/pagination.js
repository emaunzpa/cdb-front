import React,{Component} from 'react';


class Pagination extends Component{

    state = {
        page : this.props.options.page || 1,
        itemPerPage:this.props.options.itemPerPage || 10
    }

    changePage = (update) => {
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
        let newOptions = {page: update, itemPerPage:this.state.itemPerPage};
        if(this.props.otherOptions){
            Object.keys(this.props.otherOptions).forEach(element => {
                newOptions[element] = this.props.otherOptions[element];
            });
        }
        console.log(newOptions)
        return newOptions;
    }


    newOptionsSize(update){
        let newOptions = {page: 1, itemPerPage:update};
        if(this.props.otherOptions){
            Object.keys(this.props.otherOptions).forEach(element => {
                newOptions[element] = this.props.otherOptions[element]
            });
        }
        return newOptions;
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