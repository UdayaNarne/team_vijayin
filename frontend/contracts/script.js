document.querySelector('button').addEventListener('click',function(){
    window.location.href = 'sachivalayams.html'; 
});

function displaylang() {
    const languageList = document.querySelector('.language-list');
    languageList.style.display = languageList.style.display === 'block' ? 'none' : 'block';
}