import { Position, Handle } from '@xyflow/react';

export default function IfNode({data}){
    return(
        <div className='bg-amber-200 text-white p-3 rounded-xl'>
        {data.label}
         <Handle type="target" position={Position.Left}  />
         <Handle type="source" position={Position.Right} id="true" style= {{ top: "30%"}} />
         <Handle type="source" position={Position.Right} id="false" style= {{ top: "70%"}}/>
        </div>


    )
  

    

}