import {Component} from "angular2/core";
import {Detail} from "../detail/detail";

@Component({
	selector: "home",
	directives: [Detail],
	template: `
		<h3>Home</h3>
		<detail></detail>
	`
})
export class Home {
	
}