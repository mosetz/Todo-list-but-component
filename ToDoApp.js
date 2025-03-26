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
    <div class= "container">
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

getStyle(){
    return `
    /* Example minimal styling for now */
      #taskContainer {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        max-width: 400px;
        margin: auto;
        font-family: sans-serif;
        box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
      }
      form {
        display: flex;
        gap: 10px;
      }
      input[type="text"] {
        flex-grow: 1;
        padding: 8px;
      }
      button {
        padding: 8px 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      ul {
        margin-top: 16px;
        padding-left: 0;
      }
      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
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
            taskResult.innerHTML = '<p>PLease enter your task</p>';
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