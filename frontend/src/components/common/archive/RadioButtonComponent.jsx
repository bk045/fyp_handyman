import React from 'react';
const RadioButtonComponent = ({name, label, value, onChange, selected, disabled}) => {
    return ( 
        <div className="form-check mr-14 text-left">
            <label className="form-check-label inline-block -text--color-secondary cursor-pointer" 
            > 
            <input className="mr-4 -accent--color-primary-l" type="radio" value={value} id={name} name={name} onChange={onChange} checked={selected} disabled={disabled}/>
            {label}
            </label>
        </div>
     );
}
 
export default RadioButtonComponent;


// class RadioButtonComponent extends Component {
//     state = { 
//         status:"",
//      } 
//      checkSelected=()=>{
//         if (this.props.selected)
//             return this.setState({status: this.props.selected})
//      };
//     //  componentDidMount(){
//     //     this.checkSelected();
//     //  };
//     render() { 
//         const  = this.props;
//         const {status} = this.state;
//         return (
        
//         );
//     }
// }
// // onClick={status? true:true}
// export default RadioButtonComponent;