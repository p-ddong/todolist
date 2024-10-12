function TaskList(){
    
    this.list = []

    this.add = function(task){
        this.list.push(task)
    }

    this.remove = function(index){
        this.list.splice(index,1)
    }

    this.doneAndUndone = function(index) {
        this.list[index].state = !this.list[index].state;
    }

    this.update = function(index,task){
        
        this.list[index] = task
    }

    this.listAutoIndex = function(){
        this.list.forEach((item,index) => {
            item.index = index
        })
    }

    this.search = function(type,searchInput){
        let arr =[]
        
        let normalizeInput = searchInput.trim().toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

        if (type === "all"){
            this.list.forEach(item =>{
                let normalizeTask = item.task.trim().toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                var result = normalizeTask.indexOf(normalizeInput)
                
                if(result >= 0){
                    arr.push(item)
                }
            
            })
        }else if(type === "done"){

            this.list.forEach(item =>{
                if(item.state === true){
                    arr.push(item)
                }else{
                    let normalizeTask = item.task.trim().toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    var result = normalizeTask.indexOf(normalizeInput)
                
                    if(result >= 0){
                        arr.push(item)
                    }
                }
            
            })

        }else if(type === "undone"){
           
            this.list.forEach(item =>{
                if(item.state === false){
                    arr.push(item)
                }else{
                    let normalizeTask = item.task.trim().toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    var result = normalizeTask.indexOf(normalizeInput)
                
                    if(result >= 0){
                        arr.push(item)
                    }
                }
            
            })
       
        }
        
        return arr
    }
}
