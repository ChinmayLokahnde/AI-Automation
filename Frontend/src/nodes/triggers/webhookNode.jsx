import { Position, Handle } from '@xyflow/react';

export default function WebhookNode ({data}){

    return(
        <div className='bg-amber-200 text-white p-3 rounded-xl'>
            {data.label}
            <Handle type="source" position={Position.Right} />
        </div>
        
        
    )
}