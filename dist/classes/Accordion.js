//=========== Accordion
class Accordion{
    init(templateID, data, destination, search){
        
        $("body").off("click", ".accordion-title")
        if(search){
        renderer.render(templateID, data, destination)
        $(".accordion-content").hide()
        } else{
            renderer.render(templateID, data, destination)
        }
        this.bindEvents()
    }

    bindEvents(){
        $("body").on("click", ".accordion-title", this.toggleAccordion)
    }
    toggleAccordion(){
        $(this).next().slideToggle();
        $(this).toggleClass("active")
    }
}
