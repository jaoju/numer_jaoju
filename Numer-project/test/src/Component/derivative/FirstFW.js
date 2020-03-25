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
class FirstFW extends Component {
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
        if(n<=3){
            if(n%2===0){
                for(var i=n;i>=0;i--){
                    let scope={
                        x:x+(h*i)
                    }
                    if(i===n || i===0){
                        output = output+ ((pow(-1,i))*code.evaluate(scope))
                    }
                    else{
                        output = output+ ((pow(-1,i))*n*code.evaluate(scope))
                    }
                    console.log(i,x+(h*i),output)
                }
            }
            else{
                for( i=n;i>=0;i--){
                    let scope={
                        x:x+(h*i)
                    }
                    if(i===n || i===0){
                        output = output+ ((-1*pow(-1,i))*code.evaluate(scope))
                    }
                    else{
                        output = output+ ((-1*pow(-1,i))*n*code.evaluate(scope))
                    }
                    
                }
            }
        }
        if(n===4){
            let scope4={
                x:x+(h*4)
            }
            let scope3={
                x:x+(h*3)
            }
            let scope2={
                x:x+(h*2)
            }
            let scope1={
                x:x+(h*1)
            }
            let scope={
                x:x
            }
            output = (code.evaluate(scope4)-(4*(code.evaluate(scope3)))+(6*(code.evaluate(scope2)))-(4*(code.evaluate(scope1)))+code.evaluate(scope))
            console.log(scope4,scope3,scope2,scope1,scope,output)
        } 
       var eq=this.state.equation;
       var dif = eq
       for(i=0;i<n;i++){
            dif = derivative(dif, 'x')
        }
        console.log("thi is dif:",dif)
        let scoper={
            x:x
        }
        
        output=output/pow(h,n)
        console.log(output,pow(h,n))
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
                 <h1>First Forward : Fw o(h)</h1>
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

export default FirstFW;