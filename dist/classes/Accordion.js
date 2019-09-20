//=========== Accordion
class Accordion{
    init(templateID, data, destination){
        
        $("body").off("click", ".accordion-title")
        
        renderer.render(templateID, data, destination)
        $(".accordion-content").slideUp()
        this.bindEvents()
        // $(".destination").show()
    }

    bindEvents(){
        $("body").on("click", ".accordion-title", this.toggleAccordion)
    }
    toggleAccordion(){
        $(this).next().slideToggle();
        $(this).toggleClass("active")
    }
}
