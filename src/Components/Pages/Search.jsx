import React, { useState } from "react";
import '../CSS/inputSearch.css';


export default function search() {
  const [val,setVal]=useState('')
    const data=[ ""
    ]
  return (
    <div className="type">
            <input list="data" onChange={(e)=>setVal(e.target.value)} placeholder="Type" />
            <datalist id="data">
              <option>House</option>
              <option>Flat</option> 
              <option>Any</option>
              {data.map((op)=><option>{op}</option>)}
            </datalist>
            <input list="data1" onChange={(e)=>setVal(e.target.value)} placeholder="Price"  />
            <datalist id="data1">
              <option>$100000-$20000</option>
              <option>$200000-$30000</option> 
              <option>$300000-$40000</option>
              <option>$400000-$50000</option>
              <option>$500000-$60000</option>
              <option>$600000-$70000</option>
              <option>$700000-$80000</option>
              <option>$800000-$90000</option>
              {data.map((op)=><option>{op}</option>)}
            </datalist>
            <input list="data2" onChange={(e)=>setVal(e.target.value)} placeholder="Min Bedrooms"  />
            <datalist id="data2">
              <option>1</option>
              <option>2</option> 
              <option>3</option>
              {data.map((op)=><option>{op}</option>)}
            </datalist>
            <input list="data3" onChange={(e)=>setVal(e.target.value)} placeholder="Max Bedrooms"  />
            <datalist id="data3">
              <option>3</option>
              <option>4</option> 
              <option>5</option>
              {data.map((op)=><option>{op}</option>)}
            </datalist>
    </div>
    
    );
}
