import React, { Component } from 'react';
import { Button,Select,MenuItem} from '@material-ui/core';
import './pagination.css'
import First from '@material-ui/icons/FirstPage'
import Last from '@material-ui/icons/LastPage'
import Previous from '@material-ui/icons/ChevronLeft'
import Next from '@material-ui/icons/ChevronRight'
import I18n from '../config/i18n'


class Pagination extends Component {

    state = {
        page: this.props.options.page || 1,
        itemPerPage: this.props.options.itemPerPage || 10
    }


    changePage = (update) => {
        if (update >= 1 && update <= (this.props.size / this.state.itemPerPage) + 1) {
            this.setState({
                page: update
            })
            this.props.update(this.newOptionsPage(update))
        }
    }

    changeSize = (event) => {
        this.setState({
            itemPerPage: event.target.value
        });
        this.props.update(this.newOptionsSize(event.target.value));
    }

    newOptionsPage(update) {
        let newOptions = { page: update, itemPerPage: this.state.itemPerPage };
        if (this.props.otherOptions) {
            Object.keys(this.props.otherOptions).forEach(element => {
                newOptions[element] = this.props.otherOptions[element];
            });
        }
        return newOptions;
    }


    newOptionsSize(update) {
        let newOptions = { page: 1, itemPerPage: update };
        if (this.props.otherOptions) {
            Object.keys(this.props.otherOptions).forEach(element => {
                newOptions[element] = this.props.otherOptions[element]
            });
        }
        return newOptions;
    }

    numberPages() {
        return this.props.size % this.state.itemPerPage === 0 ?
            (this.props.size / this.state.itemPerPage)
            : (this.props.size / this.state.itemPerPage) + 1
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.options.page !== prevState.page) {
            return { page: nextProps.options.page }
        }
        return prevState;
    }

    keyHandler = (event) =>{
        console.log(event.keyCode)
        if(event.keyCode === 37 && this.state.page > 1 ){
            this.changePage(this.state.page -1)
        }

        if(event.keyCode === 39 && this.state.page < Math.trunc(this.numberPages()) ){
            this.changePage(this.state.page +1)
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyHandler);
    }

    render() {
        return (
            <div className="pagination" display="inline" >
                <div className="pageNavigate" >
                    <div className="size">
                        <div className="sizeNavigate" display="inline-block">
                            <I18n t="size"/> : &nbsp;
                        <Select
                                value={this.state.itemPerPage}
                                onChange={this.changeSize}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </div>
                    </div>
                    {
                        this.state.page  > 1 ?
                            <Button variant="outlined" onClick={() => this.changePage(1)}><First /></Button>
                            :
                            <Button variant="outlined" disabled={true}><First /></Button>
                    }
                    {
                        this.state.page > 1 ?
                            <Button className="pageButton" onClick={() => this.changePage(this.state.page - 1)} variant="outlined">
                                <Previous />
                            </Button>
                            :
                            <Button className="pageButton" disabled={true} variant="outlined">
                                <Previous />
                            </Button>
                    }
                    {
                        this.state.page &&
                        <Button variant="contained" onBlur={this.keyHandler} >{this.state.page}</Button>
                    }
                    {

                        this.state.page < Math.trunc(this.numberPages()) ?
                            <Button className="pageButton" onClick={() => this.changePage(this.state.page + 1)} variant="outlined">
                                <Next />
                            </Button>
                            :
                            <Button className="pageButton" disabled={true} variant="outlined">
                                <Next />
                            </Button>
                    }
                    {
                        this.state.page < Math.trunc(this.numberPages()) ?
                            <Button variant="outlined" onClick={() => this.changePage(Math.trunc(this.numberPages()))}><Last /></Button>
                            :
                            <Button variant="outlined" disabled={true}><Last /></Button>
                    }
                    <div className="max-page"><I18n t="page" />: {this.state.page ||1}/{Math.trunc(this.numberPages())||1}</div>
                </div>

            </div>
        )
    }
}

export default Pagination;