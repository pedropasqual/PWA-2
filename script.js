function adicionarTarefa(){

    const campo=document.getElementById("tarefa");
    
    const texto=campo.value;
    
    if(texto==="") return;
    
    const lista=document.getElementById("lista");
    
    const item=document.createElement("li");
    
    item.textContent=texto;
    
    lista.appendChild(item);
    
    campo.value="";
    
    }
    
    if("serviceWorker" in navigator){
    
    navigator.serviceWorker.register("sw.js");
    
    }    