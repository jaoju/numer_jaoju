import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import { compile,derivative,abs,pow } from 'mathjs'
import Algebrite from 'algebrite';
import '../Home.css'
const header = [{
    title: 'อนุพันธ์อันดับที่ n',
    dataIndex: 'n'
},{
    title: 'X',
    dataIndex: 'x'
}, {
    title: 'h',
    dataIndex: 'h'
}, {
    title: 'output',
    dataIndex: 'output',
},{
    title: 'Derivative',
    dataIndex: 'real'
},{
    title: 'Error',
    dataIndex: 'Error'
}]
class AccC extends Component {
    state = {
        result:[],
        equation: "",
        x: 0,
        n: 0,
        output: 0,
        condition: "",
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var x = parseFloat(this.state.x);
        var n = parseFloat(this.state.n);
        var h = parseFloat(this.state.h);
        var check = parseFloat(0.000000);
        var output=0;
        const code = compile(this.state.equation);
        var result1 = [];
        let scopeP2={
            x:x+(h*2)
        }
        let scopeP1={
            x:x+(h)
        }
        let scope2={
            x:x-(h*2)
        }
        let scope1={
            x:x-(h)
        }
        let scope={
            x:x
        }
        if(n===1){
            output = (((-1)*(code.evaluate(scopeP2))+(8*code.evaluate(scopeP1)))-(8*(code.evaluate(scope1))+code.evaluate(scope2)))/(12*h)
        } 
        if(n===2){
            output = (((-1)*(code.evaluate(scopeP2))+(16*code.evaluate(scopeP1)))-(30*(code.evaluate(scope)))+(16*(code.evaluate(scope1))-code.evaluate(scope2)))/(12*pow(h,2))
        } 

       var eq=this.state.equation;
       var dif = eq
       for(var i=0;i<n;i++){
            dif = derivative(dif, 'x')
        }
        console.log("thi is dif:",dif)
        let scoper={
            x:x
        }
        var real = dif.evaluate(scoper)
        var error = abs((real-output)/real)*100
        console.log(real,error)
        result1.push({
            'key' : 1,
            'n':n,
            'x':x,
            'h':h,
            'real': real,
            'output': output,
            'Error': error,
        });
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='bg'>
                 <h1>Central : o(h^4)</h1>
                <div className='inputbox'>
                    <Input name="equation" onChange={this.input.bind(this)} placeholder="Equation" />
                    <Input name="x" onChange={this.input.bind(this)} placeholder="x" />
                    <Input name="h" onChange={this.input.bind(this)} placeholder="h" />
                    <Input name="n" onChange={this.input.bind(this)} placeholder="อนุพันธ์อันดับที่ n" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default AccC;