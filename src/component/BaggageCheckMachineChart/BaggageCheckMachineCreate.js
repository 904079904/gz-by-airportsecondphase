//引入zrender
import zrender from "zrender";

function createInit(elm) {
  return zrender.init(document.getElementById(elm));
}
function createImage(opts) {
  return new zrender.Image(opts);
}
function createText(opts) {
  return new zrender.Text(opts);
}
function createGroup(opts){
  return new zrender.Group(opts);
}
export { createInit, createImage, createText,createGroup };
