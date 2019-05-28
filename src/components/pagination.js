import React,{Component} from 'react';
import {Button} from '@material-ui/core';
import I18n from '../config/i18n';

class Index extends Component{

    render(){
        return(
            <div>
            {
                this.props.page - 3 >0 &&
                <Button variant="outlined" onClick={()=>this.props.changePage(1)}>{1}</Button>
            
            }  
            {
                this.props.page - 2 >0 &&
                <Button variant="outlined" onClick={()=>this.props.changePage(this.props.page - 2)}>{this.props.page - 2}</Button>
            }
            {
                this.props.page - 1 >0 &&
                <Button variant="outlined" onClick={()=>this.props.changePage(this.props.page - 1)}>{this.props.page - 1}</Button>
            }
            {
                this.props.page &&
                <Button variant="contained">{this.props.page}</Button>
            }
            {
                this.props.page + 1 < this.props.max &&
                <Button variant="outlined" onClick={()=>this.props.changePage(this.props.page + 1)} >{this.props.page + 1}</Button>
            }
            {
                this.props.page + 2 < this.props.max &&
                <Button variant="outlined" onClick={()=>this.props.changePage(this.props.page + 2)}>{this.props.page + 2}</Button>
            }
            {
                this.props.page + 3 < this.props.max &&
                <Button variant="outlined" onClick={()=>this.props.changePage(Math.trunc(this.props.max))}>{Math.trunc(this.props.max)}</Button>
            }
            </div>
        )
    }

}

class Pagination extends Component{

    state = {
        page : this.props.options.page || 1,
        itemPerPage:this.props.options.itemPerPage || 10
    }
    

    changePage = (update) => {
        if(update >= 1 && update <= (this.props.size / this.state.itemPerPage) +1) {
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

    numberPages(){

        return this.props.size %this.state.itemPerPage === 0 ? 
            (this.props.size / this.state.itemPerPage) 
           :(this.props.size / this.state.itemPerPage) +1
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.options.page !== prevState.page){
            return{page:nextProps.options.page }
        }
        return prevState;
    }

    render(){
        return (
            
            <div className="pagination" display ="inline">
                <div className = "pageNavigate" display ="inline-block">
                    {
                        this.state.page > 1 &&
                        <Button className = "pageButton" onClick={()=> this.changePage(this.state.page -1)} variant="outlined">
                            <I18n t="previous"/>
                        </Button>
                    }
                    <Index changePage={this.changePage} page={this.state.page} max={this.numberPages()}/>
                    
                    {
                        
                        this.state.page < Math.trunc(this.numberPages()) &&
                        <Button className = "pageButton" onClick={()=> this.changePage(this.state.page +1)}  variant="outlined">
                            <I18n t="next"/>
                        </Button>
                    }
                </div>
                <div className = "sizeNavigate" display="inline-block">
                    <Button className = "pageButton" onClick={() => this.changeSize(10)}  variant="outlined">
                        10
                    </Button>
                    <Button className = "pageButton" onClick={() => this.changeSize(50)}  variant="outlined">
                        50
                    </Button>
                    <Button className = "pageButton" onClick={() => this.changeSize(100)}  variant="outlined">
                        100
                    </Button>
                </div>
            </div> 
        )
    }
}

export default Pagination;