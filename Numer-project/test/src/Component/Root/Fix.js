import React, { Component } from 'react';

import { Input, Button,Table } from 'antd'
import { compile, abs } from 'mathjs'
import '../Home.css'
const header = [{
    title: 'Iteration',
    dataIndex: 'iteration'
}, {
    title: 'X',
    dataIndex: 'x'
}, {
    title: 'Error',
    dataIndex: 'Error',
}]
class Fix extends Component {
    state = {
        result:[],
        equation: "",
        X: "",
        output: 0,
        condition: "",
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var x = this.state.X;
        x = parseFloat(x);
        var check = parseFloat(0.000000);
        const code = compile(this.state.equation);  
        var result1 = [];
        var i = 1;
        do {
            let scope = { x: x };
            var xn = code.eval(scope)
            check = abs((xn - x)/xn)*100;
            x=xn;
            result1.push({
                'iteration': i,
                'x': x,
                'Error': check,
            });
            i++;
            console.log(check)
        } while (check > 0.000001  && i<100);
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='bg'>
                 <h1>Fixpoint (One-point Iteration Method)</h1>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="X" onChange={this.input.bind(this)} placeholder="X" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default Fix;