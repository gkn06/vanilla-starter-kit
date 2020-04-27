import './styles/main.scss';

function greeter(person: string): string {
    return 'Helloo !!, ' + person;
}

const user = 'Jane User';

document.body.textContent = greeter(user);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
