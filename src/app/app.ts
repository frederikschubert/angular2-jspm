import {Component} from "angular2/core";
import {ShowCase} from "./components/showCase/showCase";

@Component({
	selector: "app",
	directives: [ShowCase],
	template: `
	<h1>Angular2 - JSPM</h1>
	<showcase></showcase>
	`
})
export class App {

    ngOnInit() {
        console.log("App");
    }

}