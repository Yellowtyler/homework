import html from "./app.html";
import './app.css'
import table from "./components/table/table";
import modal from './components/modal/modal';

const appElement = document.getElementById('root');
appElement.innerHTML = html;

appElement.append(table);
appElement.append(modal);

