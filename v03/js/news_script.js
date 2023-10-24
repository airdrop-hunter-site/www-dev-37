let changeThemeButtons = document.querySelectorAll('.theme_slider label .slider'); // Помещаем кнопки смены темы в переменную
let themeCheckbox = document.querySelectorAll('.theme_slider input[type=checkbox]');
let selectTheme = document.querySelectorAll('.select_theme');


themeCheckbox.forEach(button => {
    button.addEventListener('click', function () { // К каждой добавляем обработчик событий на клик
        if (button.checked){
            theme = "dark";
            selected = 0;
        }
        else{
            theme = "light";
            selected = 1
        }
        selectTheme.forEach(select =>{
            select.selectedIndex = selected;
        });
         
        applyTheme(theme); // Вызываем функцию, которая меняет тему и передаем в нее её название
    });
});



selectTheme.forEach(select =>{
    select.addEventListener('change', function(){
        theme = this.options[this.selectedIndex].value;
        themeCheckbox.forEach(button =>{
            button.click()
        });
        applyTheme(theme);
    })
})

function applyTheme(themeName) {
    document.querySelector('[title="theme"]').setAttribute('href', `css/news-${themeName}.css`); // Помещаем путь к файлу темы в пустой link в head
    localStorage.setItem('theme', themeName);
}

let activeTheme = localStorage.getItem('theme'); // Проверяем есть ли в LocalStorage записано значение для 'theme' и присваиваем его переменной.

if(activeTheme === null || activeTheme === 'dark') { // Если значение не записано, или оно равно 'light' - применяем светлую тему
    
    applyTheme('dark');
    themeCheckbox.forEach(button =>{
        button.checked = 1;
    });
    selectTheme.forEach(select =>{
        select.selectedIndex = 0
    });
    

} else if (activeTheme === 'light') { // Если значение равно 'dark' - применяем темную
    applyTheme('light');
    themeCheckbox.forEach(button =>{
        button.checked = 0;
    });
    selectTheme.forEach(select =>{
        select.selectedIndex = 1
    });
}