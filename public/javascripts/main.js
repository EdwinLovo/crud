usuarios();

document.querySelector('#form1').addEventListener('submit', function(e){
    e.preventDefault();
    let url = '/users';
    let data = {
        name: document.forms['form1']['name'].value,
        age: document.forms['form1']['age'].value
    }
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res=>{
        res.json();
    }).catch(err=>{
        console.log(err);
    }).then(data=>{
        usuarios();
    })
    document.forms['form1']['name'].value='';
    document.forms['form1']['age'].value='';
})

function usuarios(){
    let table = document.querySelector('#llenar');
    let contenido = '';

    fetch('/get', {
        method: 'GET'
    }).then(res=>{
        return res.text();
    }).catch(err=>{
        console.log(err);
    }).then(data=>{
        JSON.parse(data).users.forEach(element => {
            contenido = contenido + `<tr>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>
                <a href="/delete/${element._id}" class='eliminar btn btn-warning'>Eliminar</a>
                <a href="/search/${element._id}" class="actualizar btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Actualizar</a>
            </td>
            </tr>`
        });
        table.innerHTML = contenido;

        let eliminar = document.querySelectorAll('.eliminar');
        eliminar.forEach(item=>{
            item.addEventListener('click', function(e){
                e.preventDefault();
                let url = this['href'];
                console.log(url);
                fetch(url, {
                    method: "DELETE"
                }).then(res=>{
                    res.json();
                }).catch(err=>{
                    console.log(err);
                }).then(res=>{
                    usuarios();
                })
            })
        });

        let actualizar = document.querySelectorAll('.actualizar');
        actualizar.forEach(item=>{
            item.addEventListener('click', function(e){
                e.preventDefault();
                let url = this['href'];
                fetch(url, {
                    method: 'GET'
                }).then(res=>{
                    return res.text();
                }).catch(err=>{
                    console.log(err);
                }).then(data=>{
                    let form2 = document.querySelector('#form2');
                    form2.idUser.value = JSON.parse(data)._id;
                    form2.name2.value = JSON.parse(data).name;
                    form2.age2.value = JSON.parse(data).age;
                })
            })
        });
    })
}

document.querySelector('#form2').addEventListener('submit', function(e){
    e.preventDefault();
    let url = '/update/'+document.forms['form2']['idUser'].value;
    let data = {
        name: document.forms['form2']['name2'].value,
        age: document.forms['form2']['age2'].value
    }
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res=>{
        res.json();
    }).catch(err=>{
        console.log(err);
    }).then(data=>{
        usuarios();
    })
})