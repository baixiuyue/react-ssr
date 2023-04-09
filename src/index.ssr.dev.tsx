import 'global-jsdom/register';
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import App from '@/app';
 
// console.log('process.env.SSR', process.env.SSR); // server

global.rtnRootHtmlContent = (path: string, isLog)=>{
    isLog && console.log('global挂载rtnRootHtmlContent成功');
    return renderToString(
        <StaticRouter location={path}>
            <App></App>
        </StaticRouter>
    );
}