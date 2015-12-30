import {Component} from "angular2/core";
import {Detail} from "../detail/detail";

@Component({
	selector: "home",
    directives: [Detail],
	template: `
        <i class="fa fa-bluetooth"></i>
	`
})
export class Home {
    
    clicks = 11;
    
    ngOnInit() {
        console.log("Home");
    }
    
    click() {
        this.clicks++;
    }
	
}