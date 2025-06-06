// Connect to the server socket
const socket = io();

// Listen to 'number' event
socket.on('notify', (msg) => {
  console.log('Dynamic Msg:', msg);
  document.getElementById('notify').innerText = msg;
});

const getProjects = () => {
    $.get('/api/pets',(response) => {
        console.log("pets API response:" + JSON.stringify(response));
        if(response.statusCode==200){
            console.log("/api/pets Response:" + response.data);
            addCards(response.data);
        }
    })
}
const clickMe = () => {
    alert("Thanks for clicking me. Hope you find your companion today!")
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}
$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
    })
    getProjects();
    $('.modal').modal();
});
    
