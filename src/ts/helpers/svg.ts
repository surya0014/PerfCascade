/**
 *  SVG Helpers
 */

var svg = {
  newEl : function(tagName: string, settings?, css?): SVGElement{
    var el = document.createElementNS("http://www.w3.org/2000/svg", tagName) as SVGGElement;
    settings = settings || {};
    for (let attr in settings) {
      if (attr != "text") {
        el.setAttributeNS(null, attr, settings[attr])
      }
    }
    el.textContent = settings.text || ""
    el.style.cssText = css || ""
    return el
  },

  newTextEl: function(text: string, y: number, css: string = ""): SVGTextElement {
    return svg.newEl("text", {
      fill: "#111",
      y: y.toString(),
      text: text
    }, (css + " text-shadow:0 0 4px #fff;")) as SVGTextElement
  },

  //needs access to body to measure size
  //TODO: refactor for server side use
  getNodeTextWidth: function(textNode: SVGTextElement): number {
    var tmp = svg.newEl("svg:svg", {}, "visibility:hidden;")
    tmp.appendChild(textNode)
    window.document.body.appendChild(tmp)

    const nodeWidth = textNode.getBBox().width
    tmp.parentNode.removeChild(tmp)
    return nodeWidth
  },

  addClass: function(el: SVGElement, className: string) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      // IE doesn't support classList in SVG - also no need for dublication check i.t.m.
      el.setAttribute("class", el.getAttribute("class") + " " + className)
    }
    return el
  },

  removeClass: function(el: SVGElement, className: string) {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      //IE doesn't support classList in SVG - also no need for dublication check i.t.m.
      el.setAttribute("class", el.getAttribute("class").replace(new RegExp("(\\s|^)" + className + "(\\s|$)", "g"), "$2"))
    }
    return el
  }
}

export default svg