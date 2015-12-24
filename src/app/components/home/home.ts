import {Component} from "angular2/core";

@Component({
	selector: "home",
	template: `
		<h3 (click)="click()">Home</h3>
        {{clicks}}
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