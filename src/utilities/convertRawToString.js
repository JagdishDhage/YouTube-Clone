import React from 'react'

export  const convertRawToString = (lavelValue,isSub=false) => {
    
    const num = Math.abs(Number(lavelValue));
    if(num>=1.0e9){
        return (num/1.0e9).toFixed(0),"B"
    }
    if(num>=1.0e6){
        return (num/1.0e9).toFixed(0),"M"
    }
    if(num>=1.0e3){
        return (num/1.0e9).toFixed(0),"k"
    }
    
return num.toString();
}


