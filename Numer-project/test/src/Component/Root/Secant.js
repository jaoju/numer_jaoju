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
class Secant extends Component {
    state = {
        result:[],
        equation: "",
        xi: "",
        xj: "",
        output: 0,
        condition: "",
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var xi = this.state.xi;
        xi = parseFloat(xi);
        var xj = this.state.xj;
        xj = parseFloat(xj);
        var check = parseFloat(0.000000);
        const code = compile(this.state.equation);  
        var result1 = [];
        var i = 1;
        do {
            let scope = { x: xi };
            let scope1 = { x: xj };
            var difslope = (code.eval(scope)-code.eval(scope1))/(xi-xj);
            var xn = xj-(code.evaluate(scope1)/difslope)
            check = abs((xn - xj)/xn)*100;
            xi=xj
            xj=xn
            result1.push({
                'iteration': i,
                'x': xi,
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
                 <h1>Secant Method</h1>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="xi" onChange={this.input.bind(this)} placeholder="Xi" />
                    <Input name="xj" onChange={this.input.bind(this)} placeholder="Xj" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default Secant;