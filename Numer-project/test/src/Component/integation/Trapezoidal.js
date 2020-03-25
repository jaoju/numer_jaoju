import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import { compile,derivative,abs } from 'mathjs'
import Algebrite from 'algebrite';
import '../Home.css'
const header = [{
    title: 'a',
    dataIndex: 'a'
}, {
    title: 'b',
    dataIndex: 'b'
},{
    title: 'Output',
    dataIndex: 'output'
},{
    title: 'integation',
    dataIndex: 'real'
},{
    title: 'Error',
    dataIndex: 'Error'
}]
class Trapezoidal extends Component {
    state = {
        result:[],
        equation: "",
        a: 0,
        b: 0,
        output: 0,
        condition: "",
        Xm: 0,
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var a = this.state.a;
        a = parseFloat(a);
        var b = this.state.b;
        b = parseFloat(b);
        var check = parseFloat(0.000000);
        const code = compile(this.state.equation);
        let scopea = { x: a };
        let scopeb = { x: b };
        var result1 = [];
        var output = ((b-a)/2)*(code.evaluate(scopea)+code.evaluate(scopeb))
        var real = compile(Algebrite.integral(Algebrite.eval(this.state.equation)).toString())
        real = real.evaluate(scopeb)-real.evaluate(scopea)
        var error = abs((real-output)/real)*100
        console.log(real,error)
        result1.push({
            'key' : 1,
            'a': a,
            'b': b,
            'output': output,
            'real': real,
            'Error': error,
        });
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='bg'>
                 <h1>Trapezoidal Rule</h1>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="a" onChange={this.input.bind(this)} placeholder="a" />
                    <Input name="b" onChange={this.input.bind(this)} placeholder="b" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default Trapezoidal;