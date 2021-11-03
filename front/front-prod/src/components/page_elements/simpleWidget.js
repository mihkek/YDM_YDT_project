const SimpleWidget = (props) =>{
    /*
        Props
        1. Title
        2. Value
        3. BlockClass
        4. WidgetClass
        5. TitleClass
        6. ValueClass
    */
    return(
        <div class={props.blockClass}>
            <div class={props.widgetClass}>
                <div class={props.titleClass}>{props.title}</div>
                <div class={props.valueClass}>{props.value}</div>
        </div>
      </div>
    )
}
SimpleWidget.defaultProps ={
    blockClass : "dashboard__block",
    widgetClass : "widget",
    titleClass : "widget__title",
    valueClass : "widget__number"
} 
export default SimpleWidget