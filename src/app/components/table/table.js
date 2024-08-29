import html from "./table.html";
import trash from './trash.html';
import './table.css';

const mockItems = [{id: '0', name: 'name', inn: '12345678901', address: '122 street', kpp: '1311431'}]

const table = document.createElement('div');
table.innerHTML = html;


const divWrapperElement = table.querySelector('.dom-wrapper');
const tHeadElement = divWrapperElement.querySelector('thead');
const tBodyElement = divWrapperElement.querySelector('tbody');
const templateHeadRow = table.querySelector("template[id='template-head-column']")
const templateRowHead = table.querySelector("template[id='template-row-head']")
const templateRowColumn = table.querySelector("template[id='template-row-column']")

const headRowElement = document.createElement('tr');

for(const column of ['ID', 'Имя', 'ИНН', 'Адрес', "КПП"]) {

    const columnElement = templateHeadRow.content.children[0].cloneNode(true);

    columnElement.innerHTML = column;

    headRowElement.appendChild(columnElement)
}

tHeadElement.appendChild(headRowElement)

const createRowColumn = (content) => {
    const rowColumn = templateRowColumn.content.children[0].cloneNode();
    rowColumn.innerHTML = content;
    return rowColumn;
}

divWrapperElement.querySelector("button[id='add']").addEventListener("click", (e)=> addItem());

window.getCounterParties = function() {
    let counterParties = mockItems;
    
    try {
        counterParties = JSON.parse(localStorage.getItem('counterParties'));
    } catch (ignore) {
    }
    
    if (counterParties === null || counterParties.length === 0) {
        counterParties = mockItems;
        localStorage.setItem('counterParties', JSON.stringify(counterParties));
    }

    return counterParties;
}

window.refreshCounterParties = function() {
    let counterParties = getCounterParties();
    tBodyElement.innerHTML = "";
    for(const item of counterParties) {
        const bodyRowElement = document.createElement('tr');
    
        bodyRowElement.classList.add('dom-table-row')
    
        const rowHead = templateRowHead.content.children[0].cloneNode();
    
        bodyRowElement.appendChild(createRowColumn(item.id));
        bodyRowElement.appendChild(createRowColumn(item.name));
        bodyRowElement.appendChild(createRowColumn(item.inn));
        bodyRowElement.appendChild(createRowColumn(item.address));
        bodyRowElement.appendChild(createRowColumn(item.kpp));
        bodyRowElement.appendChild(createRowColumn(trash));
        
        rowHead.innerHTML = item.name;
    
        tBodyElement.appendChild(bodyRowElement)
        bodyRowElement.querySelector("button[id='delete-button']").addEventListener('click', (e) => {
            const counterParties = getCounterParties();

            const editedCounterParties = counterParties.filter(v => v.id !== item.id);

            localStorage.setItem('counterParties', JSON.stringify(editedCounterParties));
            if (editedCounterParties.length === 0) {
                localStorage.setItem('idCounter', '1');
            }
            refreshCounterParties();
        });

        bodyRowElement.addEventListener('click', (e) => {
            editItem(item.id);
        });
    }
}
  

refreshCounterParties();


export default table;