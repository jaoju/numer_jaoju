import React, { Component } from 'react';
import { Input, Button, Table } from 'antd'
import { compile, abs } from 'mathjs'
import axios from 'axios'
import '../Home.css'
const header = [{
    title: 'Iteration',
    dataIndex: 'iteration'
}, {
    title: 'xl',
    dataIndex: 'xl'
}, {
    title: 'xr',
    dataIndex: 'xr'
}, {
    title: 'xm',
    dataIndex: 'xm',
}, {
    title: 'Error',
    dataIndex: 'Error',
}]
class Bisec extends Component {
    state = {
        result: [],
        equation: "",
        Xr: 0,
        Xl: 0,
        output: 0,
        condition: "",
        Xm: 0,
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        axios
      .post("http://localhost:8000/Bisec/Bisec", {
        xl: parseFloat(this.state.Xl),
        xr: parseFloat(this.state.Xr),
        equation: this.state.equation
      })
      .then(res => {
        this.setState({result:res.data.result})
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });

  }

    render() {
        return (
            <div className='bg'>
                <h1>Bisection Method</h1>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="Xr" onChange={this.input.bind(this)} placeholder="Xr" />
                    <Input name="Xl" onChange={this.input.bind(this)} placeholder="Xl" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{ width: "900px", margin: "auto" }} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default Bisec;