function Validate(){
    
    this.checkEmpty = function(value,id,message){
        if(value.trim() === ""){
            document.getElementById(id).style.display = "block"
            document.getElementById(id).innerHTML = message
            return false
        }else{
            document.getElementById(id).style.display = "none"
            document.getElementById(id).innerHTML = ""
            return true
        }

    }

    
    this.checkSpacing = function(value,id,message){
        const hasSpaces = new RegExp('\\s');

        if(hasSpaces.test(value)){
            document.getElementById(id).style.display = "block"
            document.getElementById(id).innerHTML = message
            return false
        }else{
            document.getElementById(id).style.display = "none"
            document.getElementById(id).innerHTML = ""
            return true
        }
    
    }

    this.checkName = function(task,id,list){

        let index = list.findIndex((item) => item.employe === task.employe)

        if(index === -1){
            
            const hasDigits = new RegExp('\\d')

            if(hasDigits.test(task.name)){
                document.getElementById(id).style.display = "block"
                document.getElementById(id).innerHTML = "Name Cannot Has Nigits"
                return false
            }else{
                document.getElementById(id).style.display = "none"
                document.getElementById(id).innerHTML = ""
                return true
            }
        
        }else{
            
            let index = list.findIndex((item) => item.employe === task.employe && item.name === task.name)
        
            if(index >= 0){

                document.getElementById(id).style.display = "none"
                document.getElementById(id).innerHTML = ""
                return true
            
            }else{

                document.getElementById(id).style.display = "block"
                document.getElementById(id).innerHTML = "Name Is Not The Same"
                return false
            }
        }
    }

    this.checkTask = function(task,id,list){
        
        let index = list.findIndex((item) => item.employe === task.employe && item.task === task.task)
        
        if(index >= 0){
            document.getElementById(id).style.display = "block"
            document.getElementById(id).innerHTML = "Task Is Duplicate"
            return false
        }else{
            const isOnlyDigits = new RegExp('^\\d+$')

            if(isOnlyDigits.test(task.task)){
                document.getElementById(id).style.display = "block"
                document.getElementById(id).innerHTML = "Task Cannot Just Has Digits"
                return false
            }else{
                document.getElementById(id).style.display = "none"
                document.getElementById(id).innerHTML = ""          
                return true
            }
        }
    }



}