import React, { Component } from 'react';
import { Input, Button,Table } from 'antd'
import { compile} from 'mathjs'
import '../Home.css'
const header = [{
    title: 'Iteration',
    dataIndex: 'iteration'
}, {
    title: 'X',
    dataIndex: 'xi'
}, {
    title: 'Y',
    dataIndex: 'yi'
},{
    title: 'Yi+1',
    dataIndex: 'yi+1'
}, {
    title: 'y(x)',
    dataIndex: 'output',
}, {
    title: 'Error',
    dataIndex: 'Error',
}]
class Odeheun extends Component {
    state = {
        result:[],
        equation1: "",
        equation2: "",
        x1:"",
        x2:"",
        y:"",
        h:"",
        condition: "",
    }
    input = (e) => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    compute = () => {
        var x1 = this.state.x1;
        x1 = parseFloat(x1);
        var x2 = this.state.x2;
        x2 = parseFloat(x2);
        var y = this.state.y;
        y = parseFloat(y);
        var h = this.state.h;
        h = parseFloat(h);
        var check = parseFloat(0.000000);
        const equation1 = compile(this.state.equation1);
        const equation2 = compile(this.state.equation2);
        var result1 = [];
        var i = 0;
            do {
                let xy = { 
                    x: x1 ,
                    y: y,
                };

               var yn = y+(equation1.evaluate(xy)*h);
               let xy2={
                x: x1+h,
                y: yn,
                }
               
               var edit = y +(equation1.evaluate(xy)+equation1.evaluate(xy2))*h/2
                let scope ={
                   x: x1,
                 }
               var yeq= equation2.evaluate(scope);
                check = (yeq - edit);
                result1.push({
                    'Key':i,
                    'iteration': i,
                    'xi': x1,
                    'yi': y,
                    'yi+1': edit,
                    'output':yeq ,
                    'Error': check,
                });
                y=edit;
                x1=x1+h;
                i++;
                console.log(check)
            } while (x1<=x2);
        this.setState({ result: result1 });
    }

    render() {
        return (
            <div className='bg'>
                 <h1>Heun's Method</h1>
                <div className='inputbox'>
                    <Input name="equation1" onChange={this.input.bind(this)} placeholder="Equation dy/dx" />
                    <Input name="equation2" onChange={this.input.bind(this)} placeholder="Equation y(x)" />
                    <Input name="x1" onChange={this.input.bind(this)} placeholder="X1" />
                    <Input name="x2" onChange={this.input.bind(this)} placeholder="X2" />
                    <Input name="y" onChange={this.input.bind(this)} placeholder="Y" />
                    <Input name="h" onChange={this.input.bind(this)} placeholder="h" />
                    <Button type="primary" size="large" onClick={this.compute.bind(this)}>Submit</Button>
                </div>
                {<Table style={{width:"900px",margin:"auto"}} dataSource={this.state.result} columns={header} pagination={false} />}
            </div>
        );
    }
}

export default Odeheun;