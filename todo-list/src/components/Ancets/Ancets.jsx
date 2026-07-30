import { useState } from 'react'

export const Ancets = (props) => {
    const {name, sorname, birthday, sex, gender, profesion} = props

    return (
        <div>
            {<p>name : {name}</p>,
            <p>sorname : {sorname}</p>,
            <p>birthday : {birthday}</p>,
            <p>sex : {sex}</p>,
            <p>gender : {gender}</p>,
            <p>profesion : {profesion}</p>
            }
        </div>
    )
}