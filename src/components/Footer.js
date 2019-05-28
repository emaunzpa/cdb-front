import React,{Component} from "react";

class Footer extends Component {

    render() {
        return (
            <div>
                <div style={{
                    display: "block",
                    padding: "20px",
                    width: "100%"
                }} />
                <div style={{
                    backgroundColor:'white',
                    fontSize: "20px",
                    textAlign: "center",
                    padding: "20px",
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    width: "100%"
                }}>{this.props.content}</div>
            </div>
        )
    }


}

export default Footer;