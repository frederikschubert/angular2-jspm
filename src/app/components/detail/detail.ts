import {Component} from "angular2/core";

@Component({
	selector: "detail",
    inputs: ["test"],
	template: `
		<h4>{{test}}</h4>
        <div>
            Clicks -  {{clicks}}
        </div>
	`
})
export class Detail {

    clicks = 10;
    
    ngOnInit() {
        this.clicks = 10;
    }

}