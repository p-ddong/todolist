const taskList = new TaskList()
const val = new Validate()
let tempIndex = ""

const getId = (id) => {
    return document.getElementById(id)
}

const setLocalStorage = () =>{
    localStorage.setItem('TaskList', JSON.stringify(taskList.list))
}

const getLocalStorage = () =>{
    let localValue = localStorage.getItem('TaskList')

    if( localValue !== null){
  
      let tasklist = JSON.parse(localValue)
  
      taskList.list = tasklist
  
      showTask(taskList.list)
  
    }
}

const checkValidate = () =>{
    let employeAccount = getId("employee_account").value.toUpperCase()
    let name = getId("name").value
    let task = getId("task").value
    
    let newtask = new Task("",employeAccount,name,task)

    let isValid = true

    isValid &= val.checkEmpty(name,"name_message","Name Cannot Empty")
    
    isValid &= val.checkEmpty(employeAccount,"account_message","Account Cannot Empty")

    isValid &= val.checkEmpty(task,"task_message","Task Cannot Empty")

    
    if(isValid){

        isValid &= val.checkSpacing(employeAccount,"account_message","Account Is Not Right") 
    
        isValid &= val.checkName(newtask,"name_message",taskList.list) 
        
        isValid &= val.checkTask(newtask,"task_message",taskList.list)
    
    }
    
    return isValid
}

const showTask = (list) => {
    let doneTask =""
    let undoneTask = ""
    list.map((item,index) => {
        if(item.state === false){

            undoneTask += `
            <tr>
					<td>${item.employe}</td>
					<td>${item.name}</td>
					<td>${item.task}</td>
					<td>
						<button onclick ="removeTask('${index}')" class="btn btn-danger"><i class="fa fa-times"></i></button>
						<button onclick ="doneAndUndone('${index}')" class="btn btn-success"><i class="fa fa-check"></i></button>
                        <button onclick ="editTask('${index}')" class="btn btn-primary"><i class="fa fa-edit"></i></button>
					</td>
				</tr>
            `
        }else{
            doneTask += `
            <tr>
					<td>${item.employe}</td>
					<td>${item.name}</td>
					<td>${item.task}</td>
					<td>
						<button onclick ="removeTask('${index}')" class="btn btn-danger"><i class="fa fa-times"></i></button>
                        <button onclick ="doneAndUndone('${index}')" class="btn btn-primary"><i class="fa fa-redo"></i></button>
					</td>
				</tr>
            `
        }
    })

    getId("undone-task-tbody").innerHTML = undoneTask
    getId("done-task-tbody").innerHTML = doneTask
}

const addNewTask = () => {
    let employeAccount = getId("employee_account").value.toUpperCase()
    let name = getId("name").value
    let task = getId("task").value

    let newtask = new Task("",employeAccount,name,task)

    let isValid = checkValidate(newtask)
    if (isValid){
        taskList.add(newtask)
        taskList.listAutoIndex()
        showTask(taskList.list)

        setLocalStorage()

        getId("modal_form").reset()
        getId("btn-close").click()
    }
}

const removeTask = (index) => {
    taskList.remove(index)
    taskList.listAutoIndex()
    setLocalStorage()
    showTask(taskList.list)
}

const doneAndUndone = (index) => {
    taskList.doneAndUndone(index)
    setLocalStorage()
    showTask(taskList.list)
}

const editTask = (index) =>{

    getId("employee_account").disabled = true
    getId("name").disabled = true

    getId("btn-save").style.display ='none'
    getId("btn-edit").style.display ='block'

    getId("employee_account").value = taskList.list[index].employe
    getId("name").value = taskList.list[index].name
    getId("task").value = taskList.list[index].task
    tempIndex = index 

    document.querySelector(".modal").classList.add("show")
    document.querySelector(".modal").style.display ='block'

    getId("btn-close").addEventListener("click" , function(){
        document.querySelector(".modal").classList.remove("show")
        document.querySelector(".modal").style.display ='none'

        getId("btn-save").style.display ='block'
        getId("btn-edit").style.display ='none'

        getId("employee_account").disabled = false
        getId("name").disabled = false

        getId("modal_form").reset()
    })

}

const updateTask = () => {
    let employeAccount = getId("employee_account").value
    let name = getId("name").value
    let task = getId("task").value
    let index = tempIndex
    let newtask = new Task(index,employeAccount,name,task)
    
    let isValid = checkValidate()
    
    if (isValid){

        console.log(newtask)

        taskList.update(index,newtask)
        
        showTask(taskList.list)

        setLocalStorage()

        getId("btn-save").style.display ='block'
        getId("btn-edit").style.display ='none'

        getId("employee_account").disabled = false
        getId("name").disabled = false

        getId("modal_form").reset()
        getId("btn-close").click()

        tempIndex = ""
    }
}

const search =()=>{
    let type = getId("search-type").value
    let searchInput = getId("search-input").value
    
    let arr = taskList.search(type,searchInput)

    showTask(arr)
}

const resetForm = () =>{
    let id =["account_message","name_message","task_message"]
    id.forEach(id => {            
        document.getElementById(id).style.display = "none"
        document.getElementById(id).innerHTML = ""
    })

}

getLocalStorage()

getId("btn-edit").style.display = 'none'

getId("btn-close").addEventListener("click",resetForm)
getId("btn-search").addEventListener("click", search)
getId("btn-edit").addEventListener("click", updateTask)
getId("btn-save").addEventListener('click', addNewTask)