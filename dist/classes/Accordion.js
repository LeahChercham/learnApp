//=========== Accordion
class Accordion{
    init(data){
        $("body").off("click", ".accordion-title")
        renderer.render(RESULTS_TEMPLATE, data, RESULTS_AREA)
        this.bindEvents()
    }

    bindEvents(){
        $("body").on("click", ".accordion-title",this.toggleAccordion)
    }
    toggleAccordion(){
        $(this).next().slideToggle();
        $(this).toggleClass("active")
    }
}
