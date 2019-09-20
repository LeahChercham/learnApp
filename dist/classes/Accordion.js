//=========== Accordion
class Accordion{
    init(data){
        debugger
        $("body").off("click", ".accordion-title")
        renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
        this.bindEvents()
    }

    bindEvents(){
        debugger
        $("body").on("click", ".accordion-title",this.toggleAccordion)
    }
    toggleAccordion(){
        $(this).next().slideToggle();
        $(this).toggleClass("active")
    }
}
