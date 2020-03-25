import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import { compile,abs,sqrt } from 'mathjs'
import Algebrite from 'algebrite';
import '../Home.css'
const header = [{
    title: 'a',
    dataIndex: 'a'
}, {
    title: 'b',
    dataIndex: 'b'
}, {
    title: 'output',
    dataIndex: 'output',
},{
    title: 'integation',
    dataIndex: 'real'
},{
    title: 'Error',
    dataIndex: 'Error'
}]
class GaussQuarature extends Component {
    state = {
        result:[],
        equation: "",
        a: 0,
        b: 0,
        output: 0,
        condition: "",

    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var a = parseFloat(this.state.a);
        var b = parseFloat(this.state.b);
        var n = parseFloat(this.state.n);
        let scopea = { x: a };
        let scopeb = { x: b };
        var check = parseFloat(0.000000);
        const code = compile(this.state.equation);
        var result1 = [];
        var result
        if(n===2){
            let scope1={
                x:(((a+b)/2)+(((b-a)/2))*((1/sqrt(3)*(-1))))
            }
            let scope2={
                x:(((a+b)/2)+(((b-a)/2))*(1/sqrt(3)))
            }
            result = ((b-a)/2)*(code.evaluate(scope1)+code.evaluate(scope2))
            console.log(scope1,scope2)
        }
        if(n===3){
            let scope1={
                x:(((a+b)/2)+(((b-a)/2))*(sqrt(0.6)*(-1)))
            }
            let scope2={
                x:(a+b)/2
            }
            let scope3={
                x:(((a+b)/2)+(((b-a)/2))*(sqrt(0.6)))
            }
            result = ((b-a)/2)*(((5/9)*code.evaluate(scope1))+((8/9)*code.evaluate(scope2))+((5/9)*code.evaluate(scope3)))
        }
       
        var real = compile(Algebrite.integral(Algebrite.eval(this.state.equation)).toString())
        real = real.evaluate(scopeb)-real.evaluate(scopea)
        var error = abs((real-result)/real)*100
    
        result1.push({
            'key' : 1,
            'a': a,
            'b': b,
            'output': result,
            'real': real,
            'Error': error,
        });
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='bg'>
                 <h1>Gauss Quarature</h1>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="a" onChange={this.input.bind(this)} placeholder="a" />
                    <Input name="b" onChange={this.input.bind(this)} placeholder="b" />
                    <Input name="n" onChange={this.input.bind(this)} placeholder="Point?" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default GaussQuarature;