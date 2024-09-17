function displaylang() {
    const languageList = document.querySelector('.language-list');
    languageList.style.display = languageList.style.display === 'block' ? 'none' : 'block';
}

document.getElementById("hindi").addEventListener("click",function(){
    window.location.href = "home_hindi.html";
})
document.getElementById("telugu").addEventListener("click",function(){
    window.location.href = "home_telugu.html";
})
document.getElementById("acceptContract").addEventListener("click",function(){
    
})