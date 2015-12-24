import {Component, ViewEncapsulation} from "angular2/core";

@Component({
	selector: "detail",
	encapsulation: ViewEncapsulation.Emulated,
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
    test:string;
    
    ngOnInit() {
        this.clicks = 100;
    }

}