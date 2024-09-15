document.querySelector('button').addEventListener('click',function(){
    window.location.href = 'sachivalayams.html'; 
});

document.getElementById('contract-grid').addEventListener('click',function(){
    window.location.href = 'farmers.html'; 
})

function displaylang() {
    const languageList = document.querySelector('.language-list');
    languageList.style.display = languageList.style.display === 'block' ? 'none' : 'block';
}