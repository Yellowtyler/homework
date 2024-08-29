import html from './modal.html';

const modal = document.createElement('div');
modal.innerHTML = html;
const form = modal.querySelector('form');

window.editItem = function(id) {
    let counterParty = getCounterParties().find(v => v.id === id);
    form.querySelector('input[id="id"]').value = counterParty.id;
    form.querySelector('input[id="name"]').value = counterParty.name;
    form.querySelector('input[id="inn"]').value = counterParty.inn;
    form.querySelector('textarea[id="address"]').value = counterParty.address;
    form.querySelector('input[id="kpp"]').value = counterParty.kpp;
    form.querySelector('button[id="submit"]').innerHTML = "Редактировать";
    FlowbiteInstances.getInstance("Modal", "crud-modal").show();
  
}

window.addItem = function() {
    form.querySelector('input[id="id"]').value = '';
    form.querySelector('input[id="name"]').value = '';
    form.querySelector('input[id="inn"]').value = '';
    form.querySelector('textarea[id="address"]').value = '';
    form.querySelector('input[id="kpp"]').value = '';
    form.querySelector('button[id="submit"]').innerHTML = "Создать";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let value = {
        id: form.querySelector('input[id="id"]').value,
        name: form.querySelector('input[id="name"]').value,
        inn: form.querySelector('input[id="inn"]').value,
        address: form.querySelector('textarea[id="address"]').value,
        kpp: form.querySelector('input[id="kpp"]').value,
    };

    if (value.id === '') {
        let counter = localStorage.getItem("idCounter");
        if (counter === null) {
            counter = '1';
        }

        value.id = counter;
        localStorage.setItem('idCounter', JSON.stringify(parseInt(counter)+1));
        let counterParties = getCounterParties();
        counterParties.push(value);
        localStorage.setItem('counterParties', JSON.stringify(counterParties));
        refreshCounterParties();
        return;
    }

    const counterParties = getCounterParties();

    counterParties.forEach((item, i) => {
        if (item.id === value.id) {
            counterParties[i] = value;
        }
    })
    localStorage.setItem('counterParties', JSON.stringify(counterParties));
    FlowbiteInstances.getInstance("Modal", "crud-modal").hide();
    refreshCounterParties();
})

export default modal