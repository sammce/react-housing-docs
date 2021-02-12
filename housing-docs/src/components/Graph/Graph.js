
import React from 'react';

function Graph(props){
    return (
        <iframe 
        src={process.env.PUBLIC_URL + '/static/' + props.file} 
        style={{width: '100%', minHeight: 600, border: 'none', borderRadius: 6}}
        title={props.file}>

        </iframe>
    )
}

export default React.memo(Graph);