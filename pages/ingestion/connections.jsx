import React from 'react';
import ConnectionsList from '../../components/ingestion/connections/connectionsList';
import ingestionCss from "../../styles/ingestion.module.css";

const connections = () => {
    return (
        <div>
            <title>NuoData | Connections</title>
            <ConnectionsList ingestionCss={ingestionCss}/>
        </div>
    );
};

export default connections;