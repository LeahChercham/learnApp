//=========== Accordion
class Accordion{
    init(templateID, data, destination){
        $("body").off("click", ".accordion-title")
        renderer.render(templateID, data, destination)
        $(this).next().slideUp()
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
