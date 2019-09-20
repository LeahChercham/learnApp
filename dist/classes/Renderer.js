class Renderer {

    render(templateID, data, destination) {
        if(templateID == "results-template" && data ==""){
            $(`.${destination}`).empty()
            return}
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
