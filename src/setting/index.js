export * from "./styledCompnents.js";


//画面幅での要素出し分け
const TabWidth = 1024;
export const onlyTab = `(max-width: ${TabWidth}px)`;
export const onlyPC = `(min-width: ${TabWidth + 1}px)`;
//import MediaQuery from "react-responsive";
//import { onlyTab, onlyPC } from "../Setting"
//<MediaQuery query={onlyPC}></MediaQuery>
//<MediaQuery query={onlyTab}></MediaQuery>
