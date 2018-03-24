!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("leaflet"),require("@turf/length"),require("@turf/area"),require("lodash/template")):"function"==typeof define&&define.amd?define(["leaflet","@turf/length","@turf/area","lodash/template"],t):e.leafletMeasure=t(e.L,e.turf.length,e.turf.area,e._.template)}(this,function(e,t,s,a){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t,s=s&&s.hasOwnProperty("default")?s.default:s,a=a&&a.hasOwnProperty("default")?a.default:a;var i={acres:{factor:24711e-8,display:"acres",decimals:2},feet:{factor:3.2808,display:"feet",decimals:0},kilometers:{factor:.001,display:"kilometers",decimals:2},hectares:{factor:1e-4,display:"hectares",decimals:2},meters:{factor:1,display:"meters",decimals:0},miles:{factor:3.2808/5280,display:"miles",decimals:2},sqfeet:{factor:10.7639,display:"sqfeet",decimals:0},sqmeters:{factor:1,display:"sqmeters",decimals:0},sqmiles:{factor:3.86102e-7,display:"sqmiles",decimals:2}};function n(e){if(e)return e.setAttribute("style","display:none;"),e}function r(e){if(e)return e.removeAttribute("style"),e}function o(a){a[a.length-1];var i=a.map(function(e){return[e.lat,e.lng]}),n=new e.Polyline(i),r=new e.Polygon(i);return{length:1e3*t(n.toGeoJSON(),{units:"kilometers"}),area:s(r.toGeoJSON())}}var l={activeColor:"#ABE67E",completedColor:"#C8F2BE"},h=function(e){this._options=L.extend({},l,this._options,e)};h.prototype.getSymbol=function(e){return{measureDrag:{clickable:!1,radius:4,color:this._options.activeColor,weight:2,opacity:.7,fillColor:this._options.activeColor,fillOpacity:.5,className:"layer-measuredrag"},measureArea:{clickable:!1,stroke:!1,fillColor:this._options.activeColor,fillOpacity:.2,className:"layer-measurearea"},measureBoundary:{clickable:!1,color:this._options.activeColor,weight:2,opacity:.9,fill:!1,className:"layer-measureboundary"},measureVertex:{clickable:!1,radius:4,color:this._options.activeColor,weight:2,opacity:1,fillColor:this._options.activeColor,fillOpacity:.7,className:"layer-measurevertex"},measureVertexActive:{clickable:!1,radius:4,color:this._options.activeColor,weight:2,opacity:1,fillColor:this._options.activeColor,fillOpacity:1,className:"layer-measurevertex active"},resultArea:{clickable:!0,color:this._options.completedColor,weight:2,opacity:.9,fillColor:this._options.completedColor,fillOpacity:.2,className:"layer-measure-resultarea"},resultLine:{clickable:!0,color:this._options.completedColor,weight:3,opacity:.9,fill:!1,className:"layer-measure-resultline"},resultPoint:{clickable:!0,radius:4,color:this._options.completedColor,weight:2,opacity:1,fillColor:this._options.completedColor,fillOpacity:.7,className:"layer-measure-resultpoint"}}[e]};var u=function(e,t){return t||(t=document),t.querySelector(e)};function c(e){return e.toLocaleString()}var p={imports:{numberFormat:c},interpolate:/{{([\s\S]+?)}}/g},m=a('<a class="{{ model.className }}-toggle js-toggle" href="#" title="Measure distances and areas">Measure</a>\n<div class="{{ model.className }}-interaction js-interaction">\n  <div class="js-startprompt startprompt">\n    <h3>Measure distances and areas</h3>\n    <ul class="tasks">\n      <a href="#" class="js-start start">Create a new measurement</a>\n    </ul>\n  </div>\n  <div class="js-measuringprompt">\n    <h3>Measure distances and areas</h3>\n    <p class="js-starthelp">Start creating a measurement by adding points to the map</p>\n    <div class="js-results results"></div>\n    <ul class="js-measuretasks tasks">\n      <li><a href="#" class="js-cancel cancel">Cancel</a></li>\n      <li><a href="#" class="js-undo undo">Undo</a></li>\n      <li><a href="#" class="js-finish finish">Finish measurement</a></li>\n    </ul>\n  </div>\n</div>\n',p),d=a('<% if (model.pointCount > 0) { %>\n  <div class="group">\n      <table>\n        <tr>\n          <th style="padding-left:5px; padding-right:5px">Lat</th>\n          <th style="padding-left:5px; padding-right:5px">Lon</th>\n          <th style="padding-left:5px; padding-right:5px">Length (ft)</th>\n        </tr><tr>\n\n          <% for (i=0; i < model.points.length; i++) { %>\n            </tr><tr>\n              <td>\n                {{ numberFormat(model.points[i].lat, 6) }}\n              </td>\n              <td>\n                {{ numberFormat(model.points[i].lng, 6) }}\n              </td>\n              <td>\n                {{ model.lengths[i-1] }}\n              </td>\n            </tr>\n          <% } %>\n\n      </table>\n  </div>\n<% } %>\n\n<% if (model.pointCount > 1) { %>\n<div class="group">\n  <p><span class="heading"></span>Total Distance: {{ model.lengthDisplay }} Feet</p>\n</div>\n<% } %>\n<% if (model.pointCount > 2) { %>\n<div class="group">\n  <p><span class="heading"></span>Area: {{ model.areaDisplay }} Sq Feet</p>\n</div>\n<% } %>\n',p),g=a('<h3>Point location</h3>\n<table>\n  <tr>\n    <th style="padding-left:5px; padding-right:5px; text-align:center"><span class="heading">Lat</span></th>\n    <th style="padding-left:5px; padding-right:5px; text-align:center"><span class="heading">Lon</span></th>\n  </tr>\n  <tr>\n    <td style="padding-left:5px; padding-right:5px">\n      {{ numberFormat(model.lastCoord.dd.y, 6) }}\n    </td>\n    <td style="padding-left:5px; padding-right:5px">\n      {{ numberFormat(model.lastCoord.dd.x, 6) }}\n    </td>\n  </tr>\n</table>\n<ul class="tasks">\n  <li><a href="#" class="js-zoomto zoomto">Center on this location</a></li>\n  <li><a href="#" class="js-deletemarkup deletemarkup">Delete</a></li>\n</ul>\n',p),_=a('<h3>Linear measurement</h3>\n<p>{{ model.lengthDisplay }} Feet</p>\n<ul class="tasks">\n  <li><a href="#" class="js-zoomto zoomto">Center on this line</a></li>\n  <li><a href="#" class="js-deletemarkup deletemarkup">Delete</a></li>\n</ul>\n',p),f=a('<h3>Area measurement</h3>\n\n\n<% if (model.pointCount > 0) { %>\n  <p>\n    <table>\n      <tr>\n        <th style="padding-left:5px; padding-right:5px; text-align:center"><span class="heading">Lat</span></th>\n        <th style="padding-left:5px; padding-right:5px; text-align:center"><span class="heading">Lon</span></th>\n        <th style="padding-left:5px; padding-right:5px; text-align:center"><span class="heading">Length (ft)</span></th>\n      </tr>\n      <tr>\n        <% for (i=0; i < model.points.length; i++) { %>\n          </tr><tr>\n            <td>\n              {{ numberFormat(model.points[i].lat, 6) }}\n            </td>\n            <td>\n              {{ numberFormat(model.points[i].lng, 6) }}\n            </td>\n            <td>\n              {{ model.lengths[i-1] }}\n            </td>\n          </tr>\n        <% } %>\n      </table>\n  </p>\n<% } %>\n<p>Total Distance: {{ model.lengthDisplay }} Feet</p>\n<p>Area: {{ model.areaDisplay }} Sq Feet</p>\n<ul class="tasks">\n  <li><a href="#" class="js-zoomto zoomto">Center on this area</a></li>\n  <li><a href="#" class="js-deletemarkup deletemarkup">Delete</a></li>\n</ul>\n',p);return e.Control.extend({_className:"leaflet-control-measure",options:{units:{},position:"topright",primaryLengthUnit:"feet",primaryAreaUnit:"sqfeet",activeColor:"#ABE67E",completedColor:"#74acbd",captureZIndex:1e4,popupOptions:{className:"leaflet-measure-resultpopup",autoPanPadding:[10,10]}},initialize:function(t){e.setOptions(this,t);var s=this.options,a=s.activeColor,n=s.completedColor;this._symbols=new h({activeColor:a,completedColor:n}),this.options.units=Object.assign({},i,this.options.units)},onAdd:function(t){return this._map=t,this._latlngs=[],this._lengths=[],this._lengthNotations=[],this._vertexCircleMarkers=[],this._measureFeatures=[],this._initLayout(),t.on("click",this._collapse,this),this._layer=e.layerGroup().addTo(t),this._container},onRemove:function(e){e.off("click",this._collapse,this),e.removeLayer(this._layer)},_initLayout:function(){var t=this._className,s=this._container=e.DomUtil.create("div",t+" leaflet-bar");s.innerHTML=m({model:{className:t}}),s.setAttribute("aria-haspopup",!0),e.DomEvent.disableClickPropagation(s),e.DomEvent.disableScrollPropagation(s);var a=this.$toggle=u(".js-toggle",s);this.$interaction=u(".js-interaction",s);var i=u(".js-start",s),n=u(".js-cancel",s),r=u(".js-undo",s),o=u(".js-finish",s);this.$startPrompt=u(".js-startprompt",s),this.$measuringPrompt=u(".js-measuringprompt",s),this.$startHelp=u(".js-starthelp",s),this.$results=u(".js-results",s),this.$measureTasks=u(".js-measuretasks",s),this._collapse(),this._updateMeasureNotStarted(),e.Browser.android||(e.DomEvent.on(s,"mouseenter",this._expand,this),e.DomEvent.on(s,"mouseleave",this._collapse,this)),e.DomEvent.on(a,"click",e.DomEvent.stop),e.Browser.touch?e.DomEvent.on(a,"click",this._expand,this):e.DomEvent.on(a,"focus",this._expand,this),e.DomEvent.on(i,"click",e.DomEvent.stop),e.DomEvent.on(i,"click",this._startMeasure,this),e.DomEvent.on(n,"click",e.DomEvent.stop),e.DomEvent.on(n,"click",this._finishMeasure,this),e.DomEvent.on(r,"click",e.DomEvent.stop),e.DomEvent.on(r,"click",this._undoMeasure,this),e.DomEvent.on(o,"click",e.DomEvent.stop),e.DomEvent.on(o,"click",this._handleMeasureDoubleClick,this)},_expand:function(){n(this.$toggle),r(this.$interaction)},_collapse:function(){this._locked||(n(this.$interaction),r(this.$toggle))},_updateMeasureNotStarted:function(){n(this.$startHelp),n(this.$results),n(this.$measureTasks),n(this.$measuringPrompt),r(this.$startPrompt)},_updateMeasureStartedNoPoints:function(){n(this.$results),r(this.$startHelp),r(this.$measureTasks),n(this.$startPrompt),r(this.$measuringPrompt)},_updateMeasureStartedWithPoints:function(){n(this.$startHelp),r(this.$results),r(this.$measureTasks),n(this.$startPrompt),r(this.$measuringPrompt)},_startMeasure:function(){this._locked=!0,this._measureLengths=e.featureGroup().addTo(this._layer),this._measureVertexes=e.featureGroup().addTo(this._layer),this._captureMarker=e.marker(this._map.getCenter(),{clickable:!0,zIndexOffset:this.options.captureZIndex,opacity:0}).addTo(this._layer),this._setCaptureMarkerIcon(),this._captureMarker.on("mouseout",this._handleMapMouseOut,this).on("dblclick",this._handleMeasureDoubleClick,this).on("click",this._handleMeasureClick,this),this._map.on("mousemove",this._handleMeasureMove,this).on("mouseout",this._handleMapMouseOut,this).on("move",this._centerCaptureMarker,this).on("resize",this._setCaptureMarkerIcon,this),e.DomEvent.on(this._container,"mouseenter",this._handleMapMouseOut,this),this._updateMeasureStartedNoPoints(),this._map.fire("measurestart",null,!1)},_undoMeasure:function(){this._latlngs=this._latlngs.slice(0,-1),this._removeLastLengthNotation(),this._removeLastVertex(),this._latlngs.length>0&&(this._addMeasureArea(this._latlngs),this._addMeasureBoundary(this._latlngs),this._updateResults()),0===this._latlngs.length&&this._updateMeasureStartedNoPoints()},_finishMeasure:function(t){var s;s=!0!==t;var a=Object.assign({},this._resultsModel,{points:this._latlngs});this._locked=!1,e.DomEvent.off(this._container,"mouseover",this._handleMapMouseOut,this),this._clearMeasure(s),this._captureMarker.off("mouseout",this._handleMapMouseOut,this).off("dblclick",this._handleMeasureDoubleClick,this).off("click",this._handleMeasureClick,this),this._map.off("mousemove",this._handleMeasureMove,this).off("mouseout",this._handleMapMouseOut,this).off("move",this._centerCaptureMarker,this).off("resize",this._setCaptureMarkerIcon,this),this._layer.removeLayer(this._measureVertexes).removeLayer(this._captureMarker),this._measureVertexes=null,this._updateMeasureNotStarted(),this._collapse(),this._map.fire("measurefinish",a,!1)},_clearMeasure:function(e){this._latlngs=[],this._resultsModel=null,e&&this._measureLengths.clearLayers(),this._measureVertexes.clearLayers(),this._measureDrag&&this._layer.removeLayer(this._measureDrag),this._measureArea&&this._layer.removeLayer(this._measureArea),this._measureBoundary&&this._layer.removeLayer(this._measureBoundary),this._measureDrag=null,this._measureArea=null,this._measureBoundary=null},_centerCaptureMarker:function(){this._captureMarker.setLatLng(this._map.getCenter())},_setCaptureMarkerIcon:function(){this._captureMarker.setIcon(e.divIcon({iconSize:this._map.getSize().multiplyBy(2)}))},_getMeasurementDisplayStrings:function(e){var t=this.options.units;return{lengthDisplay:s(e.length,this.options.primaryLengthUnit,this.options.secondaryLengthUnit,this.options.decPoint,this.options.thousandsSep),areaDisplay:s(e.area,this.options.primaryAreaUnit,this.options.secondaryAreaUnit,this.options.decPoint,this.options.thousandsSep)};function s(e,s,i,n,r){var o;if(s&&t[s]){if(o=a(e,t[s],n,r),i&&t[i])o=o+" ("+a(e,t[i],n,r)+")";else o=a(e,null,n,r);return o}return a(e,null,n,r)}function a(e,t,s,a){var i=t.display;return[formattedNumber,{acres:"Acres",feet:"Feet",kilometers:"Kilometers",hectares:"Hectares",meters:"Meters",miles:"Miles",sqfeet:"Sq Feet",sqmeters:"Sq Meters",sqmiles:"Sq Miles"}[i]||i].join(" ")}},_getShorterMeasurementDisplayStrings:function(e){var t=this.options.units;return{lengthDisplay:s(e.length,this.options.primaryLengthUnit,this.options.secondaryLengthUnit,".",this.options.thousandsSep),areaDisplay:s(e.area,this.options.primaryAreaUnit,this.options.secondaryAreaUnit,this.options.decPoint,this.options.thousandsSep)};function s(e,s,i,n,r){var o;return s?(o=a(e,t[s],n,r),i&&t[i]&&(o=o+" ("+a(e,t[i],n,r)+")")):o=a(e,null,n,r),o}function a(e,t,s,a){var i=Object.assign({factor:1,decimals:2},t);return c(e*i.factor,i.decimals)}},_updateResults:function(){var e=o(this._latlngs),t=this._resultsModel=Object.assign({},e,this._getShorterMeasurementDisplayStrings(e),{pointCount:this._latlngs.length,points:this._latlngs,lengths:this._lengths});this.$results.innerHTML=d({model:t})},_handleMeasureMove:function(t){this._measureDrag?this._measureDrag.setLatLng(t.latlng):this._measureDrag=e.circleMarker(t.latlng,this._symbols.getSymbol("measureDrag")).addTo(this._layer),this._measureDrag.bringToFront()},_handleMeasureDoubleClick:function(){var t=this._latlngs,s=e.layerGroup();s.addTo(this._layer),this._measureFeatures.push(s),this._measureLengths.removeFrom(this._layer),this._measureLengths.addTo(s),this._finishMeasure(!0);for(var a=[],i=0;i<this._lengths.length;i++)a[i]=this._lengths[i];if(t.length){if(t.length>2){t.push((t||[])[0]);var n=t.length,r=t[n-2],l=t[n-1],h=e.latLngBounds(r,l).getCenter(),c=o([r,l]);this._addNewLengthNotation(h,c).addTo(this._measureLengths);var p=this._lengths.length;a[p-1]=this._lengths[p-1]}var m,d,y,v,M,k=o(t);if(1===t.length)m=e.circleMarker(t[0],this._symbols.getSymbol("resultPoint")),d=g({model:k});else if(2===t.length)m=e.polyline(t,this._symbols.getSymbol("resultLine")),d=_({model:Object.assign({},k,this._getShorterMeasurementDisplayStrings(k))});else{m=e.polygon(t,this._symbols.getSymbol("resultArea"));var L=Object.assign({},k,this._getShorterMeasurementDisplayStrings(k),{pointCount:t.length,points:t,lengths:this._lengths});d=f({model:L})}this._lengths=[],this._vertexCircleMarkers=[],(y=e.DomUtil.create("div","")).innerHTML=d,(v=u(".js-zoomto",y))&&(e.DomEvent.on(v,"click",e.DomEvent.stop),e.DomEvent.on(v,"click",function(){m.getBounds?this._map.fitBounds(m.getBounds(),{padding:[20,20],maxZoom:17}):m.getLatLng&&this._map.panTo(m.getLatLng())},this)),(M=u(".js-deletemarkup",y))&&(e.DomEvent.on(M,"click",e.DomEvent.stop),e.DomEvent.on(M,"click",function(){var e=this._measureFeatures.indexOf(s);this._measureFeatures[e].removeFrom(this._layer)},this)),m.addTo(s),m.bindPopup(y,this.options.popupOptions),m.getBounds?m.openPopup(m.getBounds().getCenter()):m.getLatLng&&m.openPopup(m.getLatLng())}},_handleMeasureClick:function(t){var s=this._map.mouseEventToLatLng(t.originalEvent),a=(this._latlngs||[]).slice(-1)[0],i=(this._latlngs||[])[0],n=this._symbols.getSymbol("measureVertex");if(!a||!s.equals(a)){if(this._latlngs.push(s),this._addMeasureArea(this._latlngs),this._addMeasureBoundary(this._latlngs),this._measureVertexes.eachLayer(function(e){e.setStyle(n),e._path&&e._path.setAttribute("class",n.className)}),this._addNewVertex(s),i){var r=this._latlngs.length,l=this._latlngs[r-2],h=e.latLngBounds(l,s).getCenter(),u=o([l,s]);this._addNewLengthNotation(h,u).addTo(this._measureLengths)}this._measureBoundary&&this._measureBoundary.bringToFront(),this._measureVertexes.bringToFront()}this._updateResults(),this._updateMeasureStartedWithPoints()},_addNewLengthNotation:function(t,s){var a=this._getShorterMeasurementDisplayStrings(s),i=e.divIcon({className:"my-div-icon",html:a.lengthDisplay}),n=e.marker(t,{icon:i});return this._lengths.push(a.lengthDisplay),this._lengthNotations.push(n),n},_removeLastLengthNotation:function(){var e=this._lengthNotations.length;this._lengthNotations.length>0&&this._lengthNotations[e-1].removeFrom(this._measureLengths),this._lengthNotations=this._lengthNotations.slice(0,-1),this._lengths=this._lengths.slice(0,-1)},_handleMapMouseOut:function(){this._measureDrag&&(this._layer.removeLayer(this._measureDrag),this._measureDrag=null)},_addNewVertex:function(t){var s=e.circleMarker(t,this._symbols.getSymbol("measureVertexActive"));this._vertexCircleMarkers.push(s),s.addTo(this._measureVertexes)},_removeLastVertex:function(){var e=this._vertexCircleMarkers.length;this._vertexCircleMarkers.length>0&&this._vertexCircleMarkers[e-1].removeFrom(this._measureVertexes),this._vertexCircleMarkers=this._vertexCircleMarkers.slice(0,-1)},_addMeasureArea:function(t){t.length<3?this._measureArea&&(this._layer.removeLayer(this._measureArea),this._measureArea=null):this._measureArea?this._measureArea.setLatLngs(t):this._measureArea=e.polygon(t,this._symbols.getSymbol("measureArea")).addTo(this._layer)},_addMeasureBoundary:function(t){t.length<2?this._measureBoundary&&(this._layer.removeLayer(this._measureBoundary),this._measureBoundary=null):this._measureBoundary?this._measureBoundary.setLatLngs(t):this._measureBoundary=e.polyline(t,this._symbols.getSymbol("measureBoundary")).addTo(this._layer)}})});
//# sourceMappingURL=leaflet-measure.js.map
