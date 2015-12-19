import {Component, ViewEncapsulation} from "angular2/core";

@Component({
	selector: "detail",
	encapsulation: ViewEncapsulation.Emulated,
	template: `
		<h3 (click)="onClick()">Test</h3>
		<div>
			{{clicks}}
		</div>
	`,
	host: {
		"class": "test"
	}
})
export class Detail {

	test: string;
	clicks: number = 10;
	
	constructor() {
		this.clicks = 50;
	}

	ngOnInit() {
		this.test = "asdf";
	}

	asdf() {
		console.log("asdf");
	}

	onClick() {
		this.clicks += 10;
	}

}