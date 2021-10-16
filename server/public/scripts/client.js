console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  $('#taskButton').on('click', createTask); //to add click listener on Create task Button
  renderTasks()
});


//Below function will run to create a task on the backend

function createTask() {
  let taskName = $('#taskInput').val();

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: {
      name: taskName
    }
  }).then(response => {

    renderTasks();

  }).catch(err => {

  })
}

//Below function will run to get a task from the backend and show the table to the user

function renderTasks() {
  $.ajax({
    method: "GET",
    url: "/tasks"
  }).then(response => {

    $('#taskList').empty()


    response.forEach(element => {
     let taskClass = ""
      element.isComplete ? taskClass = "completed-task" : taskClass = "incompleted-task"
      element.isComplete ? checkOff = "check-off" : checkOff = ""
        $('#taskList').append(`
        <li id="${element.id}" class="${taskClass}">
          <p class="${checkOff}">${element.name}</p>
          <button id="cmp-${element.id}">Complete</button>
          <button id="del-${element.id}">Delete</button>
        </li>
      `)
      $(`#cmp-${element.id}`).on('click', onClickCompleteTask);
      $(`#del-${element.id}`).on('click', onClickDeleteTask);
      $(`#cmp-${element.id}`).attr('disabled', element.isComplete);
    });

  }).catch(err => {
    console.error("GET /tasks failed", err);
  });
}

//Below function will update the user task from incomplete to complete once complete button is pressed for a task

function onClickCompleteTask() {
  let id = $(this).attr('id').split("-")[1]

  $.ajax({
    method: "PUT",
    url: `/tasks/${id}`,
    data: {
      isComplete: true,
    }
  }).then(response => {

    renderTasks();
  }).catch(err => {

  });
}

//Below function will delete a task once delete button is pressed for a task

function onClickDeleteTask() {
  let id = $(this).attr('id').split("-")[1]
  $.ajax({
    method: "DELETE",
    url: `/tasks/${id}`
  }).then(response => {
    renderTasks();
  }).catch(err => {

  });
}