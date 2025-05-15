'use client'
import React from 'react'
const Input=function (props){
    const handleChange=function(event){
        props.setString(event.target.value)
    }
    return (
        <Input onChange={handleChange} type={props.type} >
            {props.string}
        </Input>
    )
}

export default Input