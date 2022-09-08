function Item() {
    const self = this;

    const innerHtml = (parentId, data) => {
        return `
        <div class="accordion-item fadeIn">
            <h2 class="accordion-header" id="heading${data?.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${data?.id}"
                 aria-expanded="false" aria-controls="collapse${data?.id}">
                    ${data?.title}
                </button>
            </h2>
            <div id="collapse${data?.id}" class="accordion-collapse collapse" aria-labelledby="heading${data?.id}"
                data-bs-parent="#${parentId}">
                <div class="accordion-body">
                    <h6>Category: ${((data?.category?.name) ? data?.category?.name : 'N/A')}</h6>
                    ${((data?.headImage) ? `<img src="${data.headImage}" />` : '')}
                    ${data?.description}
                </div>
            </div>
        </div>
        `;
    };

    self.create = (element, data) => {
        return element.append(innerHtml(element.id, data));
    };
}