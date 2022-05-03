const initialContext = { isLoading: true, users: [] };
export const loadTemplate = (context) => {
    const source = document.getElementById("entry-template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(context);
    document.getElementById("root").innerHTML += html;
}


export const loadData = async () => {
    const response = await fetch('https://615485ee2473940017efaed3.mockapi.io/assessment');
    const users = await response.json();
    console.log(users)
    loadTemplate({ isLoading: false, users });
}

loadTemplate(initialContext);
loadData();
