/*
This to do app build base on web component allows user to
add, delete, and mark as done.
*/
class ToDoApp extends HTMLElement {

//basic constructor for custom elements
constructor(){
super();
this.attachShadow({mode: 'open'}); 
}

/*
 * This function is called when there are changes when component is add to the html page
 */
connectedCallback(){
    //Inject html and css directly in to component every thing inside this will be come layout of ToDoApp
    this.shadowRoot.innerHTML = `
    <style>${this.getStyle()}</style> <!-- style will be inject here -->
    <div class="container">
        <form id="form">
            <input type="text" id="taskInput" placeholder"Enter you task here">
            <button id="submit_btn" type="submit">Enter</button>
        </form>
        <div id="taskResult">
            <!-- result will be shown here -->
        </div>
        <ul id="taskList">
            <!-- list of task will be shown here -->
        </ul>
    </div>
    `;

    //add event listener to form to submit task 
    this.setEventListeners();
}

getStyle() {
  return `
    * {
      box-sizing: border-box;
    }

    .container {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      width: 400px;
      margin: 40px auto;
      font-family: Arial, sans-serif;
    }

    form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input[type="text"] {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }

    button {
      background-color: #0056b3;
      color: white;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background-color: #007bff;
    }

    #taskResult p {
      color: red;
      margin-top: 0;
      font-size: 14px;
      text-align: center;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    li span {
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
      text-align: center;
    }

    li input[type="checkbox"] {
      cursor: pointer;
    }

    li button {
      background-color: red;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
    }

    li button:hover {
      background-color: darkred;
    }
  `;
}


/*
 * This function is called when there are changes when component is add to the html page
 */
setEventListeners(){
    const form = this.shadowRoot.querySelector("#form");
    const taskInput = this.shadowRoot.querySelector("#taskInput");
    const taskResult = this.shadowRoot.querySelector("#taskResult");
    const taskList = this.shadowRoot.querySelector("#taskList");

    form.addEventListener("submit", (e) => {

        e.preventDefault();
        let task = taskInput.value.trim();

        //check if task is empty or not
        if(task === "" ){
            taskResult.innerHTML = '<p>Please enter your task</p>';
            setTimeout(() => taskResult.innerHTML = "", 3000);
            return;
        }

         const isDuplicate = Array.from(taskList.querySelectorAll('li span')).some(
          (el) => el.textContent.trim() === task);
          
          if(isDuplicate){
            taskResult.innerHTML = '<p>Task already exists</p>'
            setTimeout(() => taskResult.innerHTML = "", 3000);
            return;
          }

          //create task elements
          const li = document.createElement("li");

          const cb = document.createElement("input");
          cb.type = "checkbox";

          const span = document.createElement("span");
          span.textContent = task;

          //add event listener to checkbox create a line through
          cb.addEventListener("change", (e) => {
            span.style.textDecoration = cb.checked ? 'line-through' : 'none' ;
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "X";

          //add event listener to delete button
          deleteBtn.addEventListener("click", (e) => {
            li.remove();
          })

          li.appendChild(cb);
          li.appendChild(span);
          li.appendChild(deleteBtn);
        
          taskList.appendChild(li);

          taskInput.value = '';
          taskResult.innerHTML = '';
    });
  }

}

//Register custom elements with the browser
customElements.define('to-do-app', ToDoApp);