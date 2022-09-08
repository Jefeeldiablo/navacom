function Spinner() {
    const self = this;

    const innerHtml = (classList) => {
        return `
        <div class="row fadeIn${((classList) ? (' ' + classList) : '')}">
            <div class="col text-center">
                <div class="spinner-border text-primary"></div>
            </div>
        </div>
        `;
    };

    self.create = (element, classList) => {
        return element.append(innerHtml(classList));
    };
};
