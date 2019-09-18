class Renderer {

    render(templateID, data, destination) {

        $(`.${destination}`).empty()

        const source = $(`#${templateID}`).html()
        const template = Handlebars.compile(source)
        const html = template(data)
        $(`.${destination}`).append(html)
        
    }

    clear(area){
        $(`.${area}`).empty()
    }
}
