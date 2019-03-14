class NewPerson extends HTMLElement {

    static get observedAttributes() {
        return [];
    }
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();
        this.props = {};
        this.element.innerHTML = this.getTemplate();
        this.element.classList.add('wrapper');
    }
    connectedCallback() {
        const shadow = this.attachShadow({
            mode: 'open'
        });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();

        this.element.querySelector('button').addEventListener('click', this.onClick.bind(this));
    }
    onClick(){
        const inputs = this.element.querySelectorAll('input');
        this.dispatch({
            type: 'CREATE_PERSON',
            person: {
                name: inputs[0].value,
                age: inputs[1].value,
                email: inputs[2].value,
            }
        });
    }
    dispatch(action){
        const event = new CustomEvent(action.type,{
            detail: action
        });
        this.dispatchEvent(event);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.props[name] = newValue;
    }
    getStyle() {
        return `
        .wrapper{
            font-family: Arial, Helvetica, sans-serif;
        }
            `;
    }
    getTemplate() {
        return `
            <h1>Create A Person</h1>
            <label>name:</label>
            <input type="text">
            <label>age:</label>
            <input type="text">
            <label>email:</label>
            <input type="text">
            <button>create</button>
        `;
    }
}
customElements.define('x-new-person', NewPerson);