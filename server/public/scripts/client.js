$( document ).ready( function(){
    console.log( 'JQ' );

    $('#taskButton').on('click', createTask);


  }); 
  
  function createTask() {

    let taskName = $('#taskInput').val();
  
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: {
        name: taskName
      }
    }).then(response => {

  
    }).catch(err => {
  
    })
  }

