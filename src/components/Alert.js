
import React from 'react'

function Alert(props) {

  const capitalize =(word)=>{
    if(word==="danger"){ word= "Error"}
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

    return (
      <div style={{height: '35x', padding:'5px'}}>

       {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible container  fade show`} role="alert">
        <strong>{capitalize(props.alert.type)} </strong>  : {props.alert.message}
      </div>
       }
      </div>
      )
}

export default Alert